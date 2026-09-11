import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioController } from 'src/controller/servicio/servicio.controller';
import { ExtraEntity } from 'src/entity/extra/entities/extra.entity/extra.entity';
import { ServicesEntity } from 'src/entity/service/services.entity';
import { ServiceService } from 'src/services/service/service.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity, ExtraEntity])],

  controllers: [ServicioController],

  providers: [ServiceService],

  exports: [ServiceService],
})
export class ServicioModule {}
