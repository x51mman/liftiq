import {CanActivate, ExecutionContext, Injectable,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma/prisma.service';

const AccessLevel = {
  read: 0,
  write: 1,
  create: 2,
};

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessData = this.reflector.get<{
      module: string;
      level: string;
    }>('access', context.getHandler());

    if (!accessData) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPermissions = user.permissions;

    if (!userPermissions) return false;

    const permission = userPermissions.find(
      (p) => p.module === accessData.module
    );

    if (!permission) return false;

  const userLevelIndex = AccessLevel[permission.access_level];
  const requiredLevelIndex = AccessLevel[accessData.level];

  // 👇 VALIDÁCIÓ
  if (userLevelIndex === undefined || requiredLevelIndex === undefined) {
    return false;
  }

    return userLevelIndex >= requiredLevelIndex;
  }

}

