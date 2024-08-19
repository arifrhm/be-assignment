import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentHistory, PaymentAccount } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async processTransaction(
    accountId: number,
    amount: number,
    toAddress: string,
    isWithdrawal: boolean,
  ): Promise<PaymentHistory> {
    const account = await this.prisma.paymentAccount.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    const newBalance = isWithdrawal
      ? account.balance - amount
      : account.balance + amount;

    if (isWithdrawal && newBalance < 0) {
      throw new Error('Insufficient funds');
    }

    await this.prisma.paymentAccount.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    const transaction = await this.prisma.paymentHistory.create({
      data: {
        amount,
        toAddress,
        status: 'pending',
        paymentAccountId: accountId,
      },
    });

    // Simulate long-running transaction processing
    await new Promise((resolve) => setTimeout(resolve, 30000));

    await this.prisma.paymentHistory.update({
      where: { id: transaction.id },
      data: { status: 'completed' },
    });

    return transaction;
  }

  async getTransactionsForAccount(
    accountId: number,
  ): Promise<PaymentHistory[]> {
    return this.prisma.paymentHistory.findMany({
      where: { paymentAccountId: accountId },
    });
  }
}
