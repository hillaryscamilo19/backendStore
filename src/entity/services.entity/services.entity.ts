import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExtraEntity } from '../extra/entities/extra.entity/extra.entity';


@Entity('services')
export class ServicesEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @ManyToMany(() => ExtraEntity)
  @JoinTable({
    name: 'servicio_servicio_extras',
  })
  extras!: ExtraEntity[];
}
