import { PatientModule } from './account/account.module';
import { DoctorModule } from './bank-officer/bank-officer.module';

import { OrmModule } from '@/shared/orm.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrmModule, AuthModule, PatientModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
