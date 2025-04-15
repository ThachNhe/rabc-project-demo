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
import { DoctorService } from './doctor.service';
import { DoctorPolicy1, DoctorPolicy2 } from './policies/doctor.policy';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Put('doctor')
  @Roles('DOCTOR')
  @UseGuards(RolesGuard)
  @CheckPolicies(new DoctorPolicy1())
  updatePatient(@Param() params, @Body() body) {
    return this.doctorService.update(params.id, body);
  }

  @Post('doctor')
  @Roles('DOCTOR')
  @CheckPolicies(new DoctorPolicy2())
  @UseGuards(RolesGuard)
  createPatient(@Param() params, @Body() body) {
    return this.doctorService.create(params.id, body);
  }
}
