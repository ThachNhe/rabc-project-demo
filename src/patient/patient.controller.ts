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
import { GetPolicy } from './policies/patient.policy';
import { CreatePolicy } from './policies/patient.policy';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Get('patient')
  @Roles('PATIENT')
  @UseGuards(RolesGuard)
  @CheckPolicies(new GetPolicy())
  @UseGuards(PoliciesGuard)
  get(@Param() params, @Body() body) {
    return this.patientService.get(params.id);
  }

  @Post('patient')
  @Roles('PATIENT')
  @UseGuards(RolesGuard)
  @CheckPolicies(new CreatePolicy())
  @UseGuards(PoliciesGuard)
  create(@Param() params, @Body() body) {
    return this.patientService.create(params.id);
  }
}
