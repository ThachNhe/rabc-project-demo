import { Module } from '@nestjs/common';
import { BankOfficerController } from './bank-officer.controller';
import * as doctorPolicies from './policies/bank-officer.policy';

@Module({
  imports: [],
  controllers: [BankOfficerController],
  providers: [...Object.values(doctorPolicies)],
})
export class DoctorModule {}
