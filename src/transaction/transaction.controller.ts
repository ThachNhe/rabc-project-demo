import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransferFundsDto } from './dto/transfer-funds.dto';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { PoliciesGuard } from '@/policy/policies.guard';
import { CheckPolicies } from '@/policy/policy.decorator';
import {
  TellerPolicy,
  TransferMoneyPolicy,
} from './policies/transaction.policy';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard, PoliciesGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // lấy danh sách giao dịch của khách hàng
  @Get('teller-history')
  @Roles('TELLER')
  @CheckPolicies(new TellerPolicy())
  async findTellerTransactions() {
    return this.transactionService.getTellerTransactions();
  }

  // chuyyển tiền
  @Post('transfer')
  @Roles('CUSTOMER')
  @CheckPolicies(new TransferMoneyPolicy())
  async transferFunds(@Body() transferFundsDto: TransferFundsDto) {
    return this.transactionService.transferFunds(transferFundsDto);
  }
}
