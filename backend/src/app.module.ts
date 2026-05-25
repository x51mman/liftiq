import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './audit/audit.interceptor';
import { AuditModule } from './audit/audit.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, AuditModule,
    ThrottlerModule.forRoot({
     throttlers: [{
       ttl: 60000,     // milliszekundumban 
       limit: 10,   // max 10 request
       }],  
    }),
  ],

  providers: [
    {
    provide: APP_INTERCEPTOR,
    useClass: AuditInterceptor,
    },
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
