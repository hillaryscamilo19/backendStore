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

import { UpdateServiceDto } from 'src/entity/service/dto/update-service.dto/update-service.dto';
import { CreateServiceDto } from 'src/entity/service/dto/create-service.dto/create-service.dto';
import { ServiceService } from 'src/services/service/service.service';

@Controller('servicio')
export class ServicioController {
  constructor(
    private readonly serviceService: ServiceService,
  ) {}

  @Post()
  create(
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string
  ) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.serviceService.remove(id);
  }
}