import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductoService } from '../services/producto.service';
import { CreateProductoDto } from '../dto/create-producto.dto/create-producto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('producto')
export class ProductoController {
  c
  constructor(
    private readonly ProductoService: ProductoService,
  ) {}

  @Get()
  findAll() {
    return this.ProductoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.ProductoService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body()
    CreateProductoDto: CreateProductoDto,
  ) {
    return this.ProductoService.create(CreateProductoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.ProductoService.remove(id);
  }
}