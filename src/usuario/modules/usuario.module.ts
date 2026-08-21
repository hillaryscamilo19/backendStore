import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/usuario.entity/usuario.entity';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioController } from '../controller/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],

  controllers: [UsuarioController],

  providers: [UsuarioService],

  exports: [UsuarioService],
})
export class UsuarioModule {}
