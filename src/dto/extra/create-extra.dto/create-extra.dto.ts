import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  extraPrice!: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  extraDuration!: number;

  @IsEnum(ExtraCategoria)
  category!: ExtraCategoria;

  @IsOptional()
  @IsString()
  image?: string;
}