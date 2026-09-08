import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from 'src/controller/appointments/appointmets.controller';
import { AppointmentsEntity } from 'src/entity/appointments/entities/appointments.entity/appointments.entity';
import { AppointmentsService } from 'src/services/appointments/appointments.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsEntity])],

  controllers: [AppointmentsController],

  providers: [AppointmentsService],

  exports: [AppointmentsService],
})
export class AppointmentsModule {}
