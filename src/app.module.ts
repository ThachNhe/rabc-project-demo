import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';

import { OrmModule } from '@/shared/orm.module'
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrmModule, AuthModule, PatientModule, DoctorModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
