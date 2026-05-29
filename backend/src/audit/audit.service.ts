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

  async findAll(filters: {

    userId?: number;

    action?: string;

    entity?: string;

    from?: string;

    to?: string;

    page: number;

    limit: number;
  }) {

  const where: any = {};

  // USER
  if (filters.userId) {
    where.user_id = filters.userId;
  }

  // ACTION
  if (filters.action) {
    where.action = filters.action;
  }

  // ENTITY
  if (filters.entity) {
    where.entity = filters.entity;
  }

  // DATE RANGE
  if (filters.from || filters.to) {

    where.created_at = {};

    if (filters.from) {
      where.created_at.gte =
        new Date(filters.from);
    }

    if (filters.to) {
      where.created_at.lte =
        new Date(filters.to);
    }
  }

  const skip =
    (filters.page - 1) * filters.limit;

  const [items, total] =
    await this.prisma.$transaction([

      this.prisma.auditLog.findMany({
        where,

        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },

        skip,

        take: filters.limit,
      }),

      this.prisma.auditLog.count({
        where,
      }),
    ]);

  return {

    items,

    meta: {

      total,

      page: filters.page,

      limit: filters.limit,

      pages: Math.ceil(
        total / filters.limit
      ),
    },
  };
}

}