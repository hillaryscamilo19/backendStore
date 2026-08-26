import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ProductoCategoria } from 'src/producto/entities/producto.entity/producto.entity';


export class CreateProductoDto { 
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name: string ;

  @IsString()
  @MinLength(5)
  description: string ;

  @IsNumber()
  @Min(0)
  price: number ;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  @Min(0)
  stock: number ;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  brand?: string;

  @IsEnum(ProductoCategoria)
  category: ProductoCategoria ;
}