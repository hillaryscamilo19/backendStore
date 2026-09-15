import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto/create-extra.dto';
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto/update-extra.dto';
import { ExtraService } from 'src/services/extra/extra/extra.service';

@Controller('extra')
export class ExtraController {
  constructor(private readonly extraService: ExtraService) {}

  @Post()
  create(@Body() createExtraDto: CreateExtraDto) {
    return this.extraService.create(createExtraDto);
  }

  @Get()
  findAll() {
    return this.extraService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.extraService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateExtraDto: UpdateExtraDto,
  ) {
    return this.extraService.update(id, updateExtraDto);
  }
}