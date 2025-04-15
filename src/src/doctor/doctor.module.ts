import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import * as doctorPolicies from './policies/doctor.policy';

@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [
    ...Object.values(doctorPolicies),
  ],
})
export class DoctorModule {}
