import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateProfessionalDto } from 'src/dto/professionals/create/create-professional.dto/create-professional.dto';
import { UpdateProfessionalDto } from 'src/dto/professionals/update/update-professional.dto/update-professional.dto';
import { ProfessionalsService } from 'src/services/professionals/professionals.service';


@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  create(
    @Body()
    createProfessionalDto: CreateProfessionalDto,
  ) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.professionalsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalsService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.professionalsService.remove(id);
  }
}
