import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ServicesEntity } from 'src/entity/service/services.entity';

@Entity('professionals')
export class ProfessionalsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name!: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  specialty?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active!: boolean;

  @ManyToMany(() => ServicesEntity, (service) => service.professionals)
  @JoinTable({
    name: 'professional_services',
  })
  services!: ServicesEntity[];
}
