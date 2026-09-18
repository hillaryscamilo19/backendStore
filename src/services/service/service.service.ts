import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { UpdateServiceDto } from 'src/entity/service/dto/update-service.dto/update-service.dto';
import { CreateServiceDto } from 'src/entity/service/dto/create-service.dto/create-service.dto';

import { ServicesEntity } from 'src/entity/service/services.entity';
import { ExtraEntity } from 'src/entity/extra/entities/extra.entity/extra.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServicesEntity)
    private readonly serviceRepository: Repository<ServicesEntity>,

    @InjectRepository(ExtraEntity)
    private readonly extraRepository: Repository<ExtraEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServicesEntity> {
    const { extraIds, ...serviceData } = createServiceDto;

    const service = this.serviceRepository.create(serviceData);

    if (extraIds?.length) {
      const extras = await this.extraRepository.findBy({ id: In(extraIds) });

      if (extras.length !== extraIds.length) {
        throw new NotFoundException('Uno o más extras no fueron encontrados');
      }

      service.extras = extras;
    }

    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<ServicesEntity[]> {
    return this.serviceRepository.find({
      where: {
        active: true,
      },
      relations: {
        extras: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ServicesEntity> {
    const service = await this.serviceRepository.findOne({
      where: {
        id,
        active: true,
      },
      relations: {
        extras: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(
    id: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<ServicesEntity> {
    const service = await this.findOne(id);

    const { extraIds, ...serviceData } = updateServiceDto;

    Object.assign(service, serviceData);

    if (extraIds !== undefined) {
      const extras = await this.extraRepository.findBy({ id: In(extraIds) });

      if (extras.length !== extraIds.length) {
        throw new NotFoundException('Uno o más extras no fueron encontrados');
      }

      service.extras = extras;
    }

    return this.serviceRepository.save(service);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);

    service.active = false;

    await this.serviceRepository.save(service);
  }
}
