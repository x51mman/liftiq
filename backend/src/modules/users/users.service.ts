import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuditService } from '../../audit/audit.service';
import { AuditAction } from '../../audit/audit.constans';
import { ErrorCode } from 'src/common/errors/error-codes';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
              private audit: AuditService,
             ) {}

  async findAll(company_id: number) {
    return this.prisma.user.findMany({
      where: {
        companyId: company_id,
      },
    });
  }

  async create(data: { email: string; password: string; company_id: number, created_by: number, ip?: string; }) {

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const role = await this.prisma.role.findFirst({
    where: {
      companyId: data.company_id,
      code: 'USER',
    },
  });

  if (!role) {
    throw new Error('USER role not found');
  }

  const user = await this.prisma.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      companyId: data.company_id,
      roleId: role.id,
    },
  });

  await this.audit.log({
    user_id: data.created_by,
    company_id: data.company_id,
    action: 'USER_CREATED',
    entity: 'users',
    entity_id: user.id,
    metadata: {
      email: user.email,
    },
    ip_address: data.ip,
  });

  return user;

}

async changeRole(userId: number, newRoleId: number) {
  await this.prisma.user.update({
    where: { id: userId },
    data: {
      roleId: newRoleId,
      version: { increment: 1 },
    },
  });
}

async invalidateUser(userId: number) {
  await this.prisma.user.update({
    where: { id: userId },
    data: {
      version: {
        increment: 1,
      },
    },
  });
}

async deactivateUser(
  userId: number,
  adminId: number,
) {

  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (userId === adminId) {
    throw new BadRequestException({code: ErrorCode.CANNOT_DEACTIVATE_SELF});
  }

  await this.prisma.$transaction(async (tx) => {

    // USER DISABLE
    await tx.user.update({
      where: {
        id: user.id,
      },
      data: {

        isActive: false,

        // ACCESS TOKEN INVALIDATION
        version: {
          increment: 1,
        },
      },
    });

    // REFRESH TOKEN REVOKE
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
    user_id: adminId,
    company_id: user.companyId,
    action: AuditAction.USER_DEACTIVATED,
    entity: 'user',
    entity_id: user.id,
    metadata: {
      deactivated_user_email: user.email,
    },
  });

  return {
    success: true,
  };
}

async reactivateUser(
  userId: number,
  adminId: number,
) {

  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await this.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isActive: true,
    },
  });

  await this.audit.log({
    user_id: adminId,
    company_id: user.companyId,
    action: AuditAction.USER_REACTIVATED,
    entity: 'user',
    entity_id: user.id,
    metadata: {
      reactivated_user_email: user.email,
    },
  });

  return {
    success: true,
  };
}


}
