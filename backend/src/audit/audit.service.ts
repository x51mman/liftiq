import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuditAction } from './audit.constans';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    user_id?: number;
    company_id?: number;
    action: string;
    entity?: string;
    entity_id?: number;
    metadata?: any;
    ip_address?: string;
  }) {
    await this.prisma.auditLog.create({
      data,
    });
  }
}