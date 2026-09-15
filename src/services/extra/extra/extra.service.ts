import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateExtraDto } from 'src/dto/extra/create-extra.dto/create-extra.dto';
import { UpdateExtraDto } from 'src/dto/extra/update-extra.dto/update-extra.dto';
import { ExtraEntity } from 'src/entity/extra/entities/extra.entity/extra.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ExtraService {
  constructor(
    @InjectRepository(ExtraEntity)
    private readonly extraRepository: Repository<ExtraEntity>,
  ) {}

  async create(createExtraDto: CreateExtraDto): Promise<ExtraEntity> {
    const extra = this.extraRepository.create(createExtraDto);

    return this.extraRepository.save(extra);
  }

  async findAll(): Promise<ExtraEntity[]> {
    return this.extraRepository.find({
      where: {
        active: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ExtraEntity> {
    const extra = await this.extraRepository.findOne({
      where: {
        id,
        active: true,
      },
    });

    if (!extra) {
      throw new NotFoundException('Extra not found');
    }

    return extra;
  }

  async update(
    id: string,
    updateExtraDto: UpdateExtraDto,
  ): Promise<ExtraEntity> {
    const extra = await this.findOne(id);

    Object.assign(extra, updateExtraDto);

    return this.extraRepository.save(extra);
  }

  async remove(id: string): Promise<void> {
    const extra = await this.findOne(id);

    extra.active = false;

    await this.extraRepository.save(extra);
  }
}
