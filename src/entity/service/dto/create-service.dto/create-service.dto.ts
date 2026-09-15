import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { ServiceCategory } from '../../services.entity';

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(1)
  durationMinutes!: number;

  @IsEnum(ServiceCategory)
  category!: ServiceCategory;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  extraIds?: string[];
}