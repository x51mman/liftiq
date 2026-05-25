import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuditService } from '../audit/audit.service';
import { AuditAction } from '../audit/audit.constans';
import { ErrorCode } from '../common/errors/error-codes';
import { SecurityService } from '../security/security.service';
import { withTenant } from '../lib/tenant';
import { createHash } from 'crypto';
import { authenticate } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private audit: AuditService,
    private security: SecurityService,
  ) {}

  async login(email: string, password: string, ip: string) {

    const bruteForce = await this.security.detectBruteForce(email);

    if (bruteForce) {
      throw new UnauthorizedException({
        code: 'BRUTE_FORCE_DETECTED',
      });
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        role: true
      }
    })

    if (!user) {

      await this.security.logLogin({
        email,
        success: false,
        ip_address: ip,
      });

      await this.audit.log({
        action: AuditAction.LOGIN_FAILED,
        metadata: { email },
        ip_address: ip,
      });
    
      throw new UnauthorizedException({code: ErrorCode.INVALID_CREDENTIALS});
    }

    if (!user.isActive) {
      throw new UnauthorizedException({code: ErrorCode.INVALID_CREDENTIALS})
    }

    if (user.deletedAt) {
      throw new UnauthorizedException({code: ErrorCode.INVALID_CREDENTIALS})
    }

    if (user.lockUntil && user.lockUntil > new Date()) {

      await this.audit.log({
        user_id: user.id,
        company_id: user.companyId,
        action: AuditAction.ACCOUNT_LOCKED,
        ip_address: ip,
      });

      throw new UnauthorizedException({code: ErrorCode.ACCOUNT_LOCKED,});
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      const attempts = (user.failedLoginAttempts || 0) + 1;

      const updateData: any = {
        failed_login_attempts: attempts,
      };

      if (attempts >= 5) {
        updateData.lock_until = new Date(Date.now() + 15 * 60 * 1000); // 15 perc
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      await this.security.logLogin({
        user_id: user.id,
        company_id: user.companyId,
        email: user.email,
        success: false,
        ip_address: ip,
      });

      await this.audit.log({
        user_id: user.id,
        company_id: user.companyId,
        action: AuditAction.LOGIN_FAILED,
        metadata: { email },
        ip_address: ip,  
      });

      throw new UnauthorizedException({code: ErrorCode.INVALID_CREDENTIALS});
    }

    const multiIp =
      await this.security.detectMultiIpAttack(email);

    if (multiIp) {
      throw new UnauthorizedException({
        code: 'MULTI_IP_ATTACK',
      });
    }

    const stuffing =
      await this.security.detectCredentialStuffing(ip);

    if (stuffing) {
      throw new UnauthorizedException({
        code: 'CREDENTIAL_STUFFING',
      });
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockUntil: null,
        lastLoginAt: new Date(),
        lastLoginIp: ip,
      },
    });

    const permissions = await this.prisma.rolePermission.findMany({
      where: {
        roleId: user.roleId,
      },
      include: {
        module: true,
      },
    });

    const payload = {
      sub: user.id,
      email: user.email,
      company_id: user.companyId,
      role_id: user.roleId,
      //role_code: user.roleId.code,
      version: user.version,
      permissions: permissions.map((p) => ({
        module: p.module.code,
        level: p.accessLevel,
      })),
    };

    await this.security.logLogin({
      user_id: user.id,
      company_id: user.companyId,
      email: user.email,
      success: true,
      ip_address: ip,
    });

    await this.audit.log({
      user_id: user.id,
      company_id: user.companyId,
      action: AuditAction.LOGIN_SUCCESS,
      ip_address: ip,
      metadata: {
      email: user.email,
      },
    });

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(
      { 
        sub: user.id,
        type: 'refresh',
        version: user.version,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d' 
      },
    );

    const hashedRefreshToken  = createHash('sha256')
      .update(refreshToken)
      .digest('hex')

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashedRefreshToken,
        expiresAt: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        ipAddress: ip,
      },
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async registerCompany(data: {
    company_name: string;
    email: string;
    tax_number: string;
    password: string;
    ip: string;
  }) {
  
  const result = await this.prisma.$transaction(async (tx) => {

    const company = await tx.company.create({
      data: {
        name: data.company_name,
        taxNumber: data.tax_number,
      },
    });

    const adminRole = await tx.role.create({
      data: {
        companyId: company.id,
        code: 'ADMIN',
        name: 'Administrator',
      },
    });

    const userRole = await tx.role.create({
      data: {
        companyId: company.id,
        code: 'USER',
        name: 'User',
      },
    });

    // MODULE LEKÉRÉS
    const usersModule = await tx.module.findUnique({
      where: { code: 'USERS' },
    });

    if (!usersModule) {
      throw new Error('USERS module not found');
    }

    // PERMISSIONS

    // ADMIN → create
    await tx.rolePermission.create({
      data: {
        roleId: adminRole.id,
        moduleId: usersModule.id,
        accessLevel: 'admin',
      },
    });

    // USER → read
    await tx.rolePermission.create({
      data: {
        roleId: userRole.id,
        moduleId: usersModule.id,
        accessLevel: 'read',
      },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await tx.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
        companyId: company.id,
        roleId: adminRole.id, 
      },
    });
    
    return { company, user };
  });
  
  await this.audit.log({
    user_id: result.user.id,
    company_id: result.company.id,
    action: AuditAction.COMPANY_REGISTERED,
    ip_address: data.ip,
    metadata: {
      company_name: result.company.name,
      email: result.user.email,
    },
  });

  return result;

}

async refresh(refreshToken: string, ip: string, userAgent: string) {
  try {

    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET, });

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException({
        code: 'NOT_TOKEN_REFRESH',
      }); 
    }

    // HASH
    const tokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex')

    // TOKEN CHECK
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: {
        tokenHash
      }
    })

    if (!storedToken) {
      throw new UnauthorizedException()
    }

    // REVOKED CHECK
    if (storedToken.revokedAt) {
      await this.prisma.refreshToken.updateMany({
        where: {
          userId: storedToken.userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      throw new UnauthorizedException({
        code: ErrorCode.REFRESH_TOKEN_REUSED,
      });
    }

    // EXPIRE CHECK
    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException()
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!user.isActive) {
      throw new UnauthorizedException()
    }

    if (user.deletedAt) {
      throw new UnauthorizedException()
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException()
    }

    if (payload.version !== user.version) {
      throw new UnauthorizedException({
        code: ErrorCode.TOKEN_VERSION_MISMATCH,
      });
    }

    const result = await this.prisma.$transaction(async (tx) => {

      await tx.refreshToken.update({
        where: {
          id: storedToken.id,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      const permissions = await tx.rolePermission.findMany({
        where: {
          roleId: user.roleId,
        },
        include: {
          module: true,
        },
      });

      const accessPayload  = {
        sub: user.id,
        email: user.email,
        company_id: user.companyId,
        role_id: user.roleId,
        role_code: user.role.code,
        version: user.version,
        permissions: permissions.map((p) => ({
          module: p.module.code,
          level: p.accessLevel,
        })),
      };

      const accessToken = this.jwtService.sign(accessPayload);

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id,
          type: 'refresh',
          version: user.version,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );

      const newTokenHash = createHash('sha256')
        .update(newRefreshToken)
        .digest('hex');


      await tx.refreshToken.create({
        data: {
          userId: user.id,
          tokenHash: newTokenHash,
          createdAt: new Date(),
          ipAddress: ip,
          userAgent: userAgent,

          expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ),
        },
      });
    
      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    });

    await this.audit.log({
      user_id: user.id,
      company_id: user.companyId,
      action: AuditAction.TOKEN_REFRESH,
    });

  return result;
  }

catch (error) {

  console.error(error);

  await this.audit.log({
    action: AuditAction.TOKEN_REFRESH_FAILED,
  });

  if (error instanceof UnauthorizedException) {
    throw error;
  }

  throw new UnauthorizedException({
    code: ErrorCode.INVALID_REFRESH_TOKEN,
  });
}
  
}

async logout(refreshToken: string) {

  const tokenHash = createHash('sha256')
    .update(refreshToken)
    .digest('hex');

  const storedToken =
    await this.prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
    });

  // nincs token → oké
  // logout legyen idempotent
  if (!storedToken) {
    return {
      success: true,
    };
  }

  await this.prisma.refreshToken.update({
    where: {
      id: storedToken.id,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  await this.audit.log({
    user_id: storedToken.userId,
    action: AuditAction.LOGOUT,
  });

  return {
    success: true,
  };
}

async logoutAll(userId: number) {

  // összes refresh token revoke
  await this.prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  // access token invalidation
  await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      version: {
        increment: 1,
      },
    },
  });

  await this.audit.log({
    user_id: userId,
    action: AuditAction.LOGOUT_ALL_DEVICES,
  });

  return {
    success: true,
  };
}

async changePassword( userId: number, currentPassword: string, newPassword: string,) {

  // USER
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new UnauthorizedException();
  }

  // CURRENT PASSWORD CHECK
  const isMatch = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );

  if (!isMatch) {

    await this.audit.log({
      user_id: user.id,
      company_id: user.companyId,
      action: AuditAction.PASSWORD_CHANGE_FAILED,
    });

    throw new UnauthorizedException({
      code: ErrorCode.INVALID_CREDENTIALS,
    });
  }

  const samePassword = await bcrypt.compare(
    newPassword,
    user.passwordHash,
  );

  if (samePassword) {
    throw new UnauthorizedException({
      code: ErrorCode.PASSWORD_MUST_BE_DIFFERENT,
    });
  }

  await this.prisma.$transaction(async (tx) => {

  
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        
    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: hashedNewPassword,

        // ACCESS TOKEN INVALIDATION
        version: {
          increment: 1,
        },
      },
    });

    await tx.refreshToken.updateMany({
      where: {
        userId: user.id,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  });

  await this.audit.log({
    user_id: user.id,
    company_id: user.companyId,
    action: AuditAction.PASSWORD_CHANGED,
  });

  return {
    success: true,
  };
}

}