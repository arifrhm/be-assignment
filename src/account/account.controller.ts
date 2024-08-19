import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createAccount(@Request() req, @Body() accountData: { type: string }) {
    return this.accountService.createAccount(req.user.id, accountData.type);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAccounts(@Request() req) {
    return this.accountService.getAccountsForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountById(Number(id));
  }
}
