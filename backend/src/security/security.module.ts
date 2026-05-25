import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}