import { PoliciesGuard } from '@/policy/policies.guard';
import { CheckPolicies } from '@/policy/policy.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  TransactionPolicy1,
  TransactionPolicy2,
  TransactionPolicy3,
} from './policies/transaction.policy';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('transfer')
  @Roles('CUSTOMER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new TransactionPolicy1())
  @UseGuards(PoliciesGuard)
  transfer(@Body() body) {
    return this.transactionService.transfer(body);
  }

  @Post('deposit')
  @Roles('BANK_OFFICER')
  @CheckPolicies(new TransactionPolicy2())
  @UseGuards(RolesGuard)
  deposit(@Body() body) {
    return this.transactionService.deposit(body);
  }

  @Post('withdraw')
  @Roles('BANK_OFFICER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new TransactionPolicy2())
  withdraw(@Body() body) {
    return this.transactionService.withdraw(body);
  }

  @Get('history')
  @Roles('CUSTOMER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new TransactionPolicy3())
  @UseGuards(PoliciesGuard)
  getHistory(@Query('accountId') accountId: string) {
    return this.transactionService.getHistory(accountId);
  }

  @Get(':id')
  @Roles('CUSTOMER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new TransactionPolicy1())
  getTransaction(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
