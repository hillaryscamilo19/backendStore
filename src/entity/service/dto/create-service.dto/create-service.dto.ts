import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
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
}
