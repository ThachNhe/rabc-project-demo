import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PoliciesGuard } from '@/policy/policies.guard';
import { CheckPolicies } from '@/policy/policy.decorator';
import { BankOfficerService } from './bank-officer.service';
import {
  BankOfficerPolicy1,
  BankOfficerPolicy2,
} from './policies/bank-officer.policy';

@Controller('bank-officer')
export class BankOfficerController {
  constructor(private readonly bankOfficerService: BankOfficerService) {}

  @Put('bank-officer')
  @Roles('BANK_OFFICER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new BankOfficerPolicy1())
  updateAccount(@Param() params, @Body() body) {
    return this.bankOfficerService.update(params.id, body);
  }

  @Post('bank-officer')
  @Roles('BANK_OFFICER')
  @CheckPolicies(new BankOfficerPolicy2())
  @UseGuards(RolesGuard)
  createAccount(@Param() params, @Body() body) {
    return this.bankOfficerService.create(params.id, body);
  }
}
