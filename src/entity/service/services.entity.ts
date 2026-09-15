import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ExtraEntity } from '../extra/entities/extra.entity/extra.entity';

export enum ServiceCategory {
  CABELLO = 'cabello',
  UNAS = 'unas',
}

@Entity('services')
export class ServicesEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'integer',
    default: 60,
  })
  durationMinutes!: number;

  @Column({
    type: 'enum',
    enum: ServiceCategory,
  })
  category!: ServiceCategory;

  @Column({
    type: 'boolean',
    default: true,
  })
  active!: boolean;

  @ManyToMany(() => ExtraEntity)
  @JoinTable({
    name: 'service_service_extras',
  })
  extras!: ExtraEntity[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}