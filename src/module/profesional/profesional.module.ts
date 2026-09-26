import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalsController } from 'src/controller/professionals/professionals.controller';
import { ProfessionalsEntity } from 'src/entity/professionals/professionals.entity/professionals.entity';
import { ServicesEntity } from 'src/entity/service/services.entity';
import { ProfessionalsService } from 'src/services/professionals/professionals.service';


@Module({
    imports: [
    TypeOrmModule.forFeature([
      ProfessionalsEntity,
      ServicesEntity,
    ]),
  ],
  controllers: [
    ProfessionalsController,
  ],
  providers: [
    ProfessionalsService,
  ],
  exports: [
    ProfessionalsService,
  ],
})
export class ProfesionalModule {}
