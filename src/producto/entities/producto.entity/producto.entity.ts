import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductoCategoria {
  CELULARES = 'celulares',
  AUDIO = 'audio',
  ACCESORIOS = 'accesorios',
  COMPUTACION = 'computacion',
  OTROS = 'otros',
}

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string;

  @Column({
    type: 'integer',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  brand: string;

  @Column({
    type: 'enum',
    enum: ProductoCategoria,
    default: ProductoCategoria.OTROS,
  })
  category: ProductoCategoria;

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
