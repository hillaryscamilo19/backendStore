import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioController } from 'src/controller/servicio/servicio.controller';
import { ExtraEntity } from 'src/entity/extra/entities/extra.entity/extra.entity';
import { ServicesEntity } from 'src/entity/services.entity/services.entity';
import { ServicioService } from 'src/services/servicio/servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity, ExtraEntity])],

  controllers: [ServicioController],

  providers: [ServicioService],

  exports: [ServicioService],
})
export class ServicioModule {}
