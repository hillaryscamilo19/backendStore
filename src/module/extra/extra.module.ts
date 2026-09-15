import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtraController } from 'src/controller/extra/extra.controller';
import { ExtraEntity } from 'src/entity/extra/entities/extra.entity/extra.entity';
import { ExtraService } from 'src/services/extra/extra/extra.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExtraEntity])],

  controllers: [ExtraController],

  providers: [ExtraService],

  exports: [ExtraService],
})
export class ExtraModule {}
