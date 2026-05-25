import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Access } from 'src/auth/decorators/access.decorator';
import { Audit } from 'src/audit/decorators/audit.decorator'
import { AuditAction } from 'src/audit/audit.constans';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.usersService.findAll((req as any).user.company_id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Access('USERS', 'create')
  @Audit(AuditAction.USER_CREATED)
  @Post()
  create(@Req() req: Request, @Body() body: CreateUserDto) {
    const user = (req as any).user;

    return this.usersService.create({
      email: body.email,
      password: body.password,
      company_id: user.company_id,
      created_by: user.sub,
      ip: req.ip,
    });
  }
}
