import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuditModule } from '../audit/audit.module';
import { SecurityModule } from '../security/security.module'
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'supersecretkey', // később .env!
      signOptions: { expiresIn: '15m' },
    }),
    AuditModule,
    SecurityModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
