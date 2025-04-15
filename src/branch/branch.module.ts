import { Module } from '@nestjs/common';
import { TransactionController } from './branch.controller';
import * as doctorPolicies from './policies/branch.policy';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [...Object.values(doctorPolicies)],
})
export class DoctorModule {}
