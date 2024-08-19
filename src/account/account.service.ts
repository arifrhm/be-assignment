import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, PaymentAccount } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(userId: number, type: string): Promise<PaymentAccount> {
    return this.prisma.paymentAccount.create({
      data: {
        type,
        userId,
      },
    });
  }

  async getAccountsForUser(userId: number): Promise<PaymentAccount[]> {
    return this.prisma.paymentAccount.findMany({
      where: { userId },
    });
  }

  async getAccountById(accountId: number): Promise<PaymentAccount> {
    return this.prisma.paymentAccount.findUnique({
      where: { id: accountId },
    });
  }
}
