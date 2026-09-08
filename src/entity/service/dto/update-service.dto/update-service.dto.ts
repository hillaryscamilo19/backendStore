import { PartialType } from "@nestjs/mapped-types";
import { CreateServiceDto } from "../create-service.dto/create-service.dto";

export class UpdateServiceDto extends PartialType(
  CreateServiceDto,
) {}
