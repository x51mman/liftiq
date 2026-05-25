import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  async logLogin(data: {
    user_id?: number;
    company_id?: number;
    email?: string;

    success: boolean;

    ip_address?: string;
    user_agent?: string;
  }) {
    await this.prisma.loginHistory.create({
      data,
    });
  }

  async detectBruteForce(email: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000);

  const failedCount = await this.prisma.loginHistory.count({
    where: {
      email,
      success: false,
      createdAt: {
        gte: since,
      },
    },
  });

  return failedCount >= 10;
}

async detectMultiIpAttack(email: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000);

  const logins = await this.prisma.loginHistory.findMany({
    where: {
      email,
      success: false,
      createdAt: {
        gte: since,
      },
    },
    select: {
      ipAddress: true,
    },
  });

  const uniqueIps = new Set(logins.map((x) => x.ipAddress));

  return uniqueIps.size >= 5;
}

async detectCredentialStuffing(ip: string) {
  const since = new Date(Date.now() - 10 * 60 * 1000);

  const logins = await this.prisma.loginHistory.findMany({
    where: {
      ipAddress: ip,
      success: false,
      createdAt: {
        gte: since,
      },
    },
    select: {
      email: true,
    },
  });

  const uniqueEmails = new Set(logins.map((x) => x.email));

  return uniqueEmails.size >= 10;
}

}