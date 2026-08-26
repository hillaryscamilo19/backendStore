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
export class ProductoEntity {}

@Entity('products')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  name: string ;

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
    nullable: true,
  })
  image: string;

  @Column({
    default: 0,
  })
  stock: number;

  @Column({
    length: 100,
    nullable: true,
  })
  brand: string;

  @Column({
    type: 'enum',
    enum: ProductoCategoria,
    default: ProductoCategoria.OTROS,
  })
  category: ProductoCategoria | undefined;

  @Column({
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
