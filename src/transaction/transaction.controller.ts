import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async send(
    @Request() req,
    @Body()
    transactionData: { accountId: number; amount: number; toAddress: string },
  ) {
    return this.transactionService.processTransaction(
      transactionData.accountId,
      transactionData.amount,
      transactionData.toAddress,
      false,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  async withdraw(
    @Request() req,
    @Body()
    transactionData: { accountId: number; amount: number; toAddress: string },
  ) {
    return this.transactionService.processTransaction(
      transactionData.accountId,
      transactionData.amount,
      transactionData.toAddress,
      true,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('account/:accountId')
  async getTransactions(@Param('accountId') accountId: string) {
    return this.transactionService.getTransactionsForAccount(Number(accountId));
  }
}
