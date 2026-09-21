
import { PartialType } from 'node_modules/@nestjs/swagger/dist/type-helpers/partial-type.helper';
import { CreateProfessionalDto } from '../../create/create-professional.dto/create-professional.dto';
export class UpdateProfessionalDto extends PartialType(
  CreateProfessionalDto,
) {}