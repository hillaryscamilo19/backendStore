import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from '../entities/producto.entity/producto.entity';
import { CreateProductoDto } from '../dto/create-producto.dto/create-producto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productsRepository: Repository<Producto>,
  ) { }

  async create(createProductDto: CreateProductoDto): Promise<Producto> {
    const product = this.productsRepository.create(createProductDto);

    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Producto[]> {
    return this.productsRepository.find({
      where: {
        active: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Producto> {
    const product = await this.productsRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.active = false;

    await this.productsRepository.save(product);
  }
}
