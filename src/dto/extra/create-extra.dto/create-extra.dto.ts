import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ExtraCategoria } from 'src/entity/extra/entities/extra.entity/extra.entity';

export class CreateExtraDto {
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  extraPrice!: number;

  @IsNumber()
  @Min(0)
  extraDuration!: number;

  @IsEnum(ExtraCategoria)
  category!: ExtraCategoria;
}