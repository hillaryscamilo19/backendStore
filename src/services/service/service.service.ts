import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateServiceDto } from 'src/entity/service/dto/update-service.dto/update-service.dto';
import { ServicesEntity } from 'src/entity/service/services.entity';
import { CreateServiceDto } from 'src/entity/services/dto/create-service.dto/create-service.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServicesEntity)
    private readonly serviceRepository: Repository<ServicesEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServicesEntity> {
    const service = this.serviceRepository.create(createServiceDto);

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

    Object.assign(service, updateServiceDto);

    return this.serviceRepository.save(service);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);

    service.active = false;

    await this.serviceRepository.save(service);
  }
}
