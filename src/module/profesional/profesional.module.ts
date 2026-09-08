import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalsEntity } from 'src/entity/professionals/professionals.entity/professionals.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessionalsEntity])
  ],
})
export class ProfesionalModule {}
