import { PoliciesGuard } from '@/policy/policies.guard';
import { CheckPolicies } from '@/policy/policy.decorator';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccountService } from './acount.service';
import { CreatePolicy, GetPolicy } from './policies/account.policy';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get('account')
  @Roles('CUSTOMER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new GetPolicy())
  @UseGuards(PoliciesGuard)
  get(@Param() params, @Body() body) {
    return this.accountService.get(params.id);
  }

  @Post('account')
  @Roles('CUSTOMER')
  @UseGuards(RolesGuard)
  @CheckPolicies(new CreatePolicy())
  @UseGuards(PoliciesGuard)
  create(@Param() params, @Body() body) {
    return this.accountService.create(params.id);
  }
}
