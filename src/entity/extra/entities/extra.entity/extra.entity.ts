import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ExtraCategoria {
  CABELLO = 'cabello',
  UNAS = 'unas',
}

@Entity('servicio_extras')
export class ExtraEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  extraPrice: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  extraDuration: number;

  @Column({
    type: 'enum',
    enum: ExtraCategoria,
  })
  category: ExtraCategoria;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}