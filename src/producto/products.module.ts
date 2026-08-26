import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity/producto.entity';
import { ProductoController } from './controller/producto.controller';
import { ProductoService } from './services/producto.service';


@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],

})
export class ProductsModule {}
