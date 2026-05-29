import { Controller, Get, Query, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Access } from '../auth/decorators/access.decorator';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {

  constructor(
    private auditService: AuditService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Access('AUDIT', 'read')
  @Get()
  findAll(

    @Query('user_id')
    userId?: string,

    @Query('action')
    action?: string,

    @Query('entity')
    entity?: string,

    @Query('from')
    from?: string,

    @Query('to')
    to?: string,

    @Query('page')
    page?: string,

    @Query('limit')
    limit?: string,
  ) {

    return this.auditService.findAll({
      userId: userId
        ? Number(userId)
        : undefined,

      action,

      entity,

      from,

      to,

      page: page
        ? Number(page)
        : 1,

      limit: limit
        ? Number(limit)
        : 20,
    });
  }
}