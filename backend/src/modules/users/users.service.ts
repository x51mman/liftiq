import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuditService } from '../../audit/audit.service';

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

}
