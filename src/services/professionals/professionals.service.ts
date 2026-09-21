import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfessionalDto } from 'src/dto/professionals/create/create-professional.dto/create-professional.dto';
import { UpdateProfessionalDto } from 'src/dto/professionals/update/update-professional.dto/update-professional.dto';
import { ProfessionalsEntity } from 'src/entity/professionals/professionals.entity/professionals.entity';
import { ServicesEntity } from 'src/entity/service/services.entity';
import { In, Repository } from 'typeorm';


@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(ProfessionalsEntity)
    private readonly professionalRepository: Repository<ProfessionalsEntity>,

    @InjectRepository(ServicesEntity)
    private readonly serviceRepository: Repository<ServicesEntity>,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<ProfessionalsEntity> {
    const {
      serviceIds,
      ...professionalData
    } = createProfessionalDto;

    const professional =
      this.professionalRepository.create(professionalData);

    if (serviceIds?.length) {
      const services = await this.serviceRepository.findBy({
        id: In(serviceIds),
        active: true,
      });

      if (services.length !== serviceIds.length) {
        throw new NotFoundException(
          'Uno o más servicios no fueron encontrados',
        );
      }

      professional.services = services;
    }

    return this.professionalRepository.save(professional);
  }

  async findAll(): Promise<ProfessionalsEntity[]> {
    return this.professionalRepository.find({
      where: {
        active: true,
      },
      relations: {
        services: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ProfessionalsEntity> {
    const professional =
      await this.professionalRepository.findOne({
        where: {
          id,
          active: true,
        },
        relations: {
          services: true,
        },
      });

    if (!professional) {
      throw new NotFoundException(
        'Professional not found',
      );
    }

    return professional;
  }

  async update(
    id: string,
    updateProfessionalDto: UpdateProfessionalDto,
  ): Promise<ProfessionalsEntity> {
    const professional = await this.findOne(id);

    const {
      serviceIds,
      ...professionalData
    } = updateProfessionalDto;

    Object.assign(
      professional,
      professionalData,
    );

    if (serviceIds !== undefined) {
      const services = await this.serviceRepository.findBy({
        id: In(serviceIds),
        active: true,
      });

      if (services.length !== serviceIds.length) {
        throw new NotFoundException(
          'Uno o más servicios no fueron encontrados',
        );
      }

      professional.services = services;
    }

    return this.professionalRepository.save(
      professional,
    );
  }

  async remove(id: string): Promise<void> {
    const professional = await this.findOne(id);

    professional.active = false;

    await this.professionalRepository.save(
      professional,
    );
  }
}