import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import * as patientPolicies from './policies/patient.policy';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [
    ...Object.values(patientPolicies),
  ],
})
export class PatientModule {}
