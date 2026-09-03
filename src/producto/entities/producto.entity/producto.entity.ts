import { Column } from 'typeorm/browser';

@Entity('products')
export class ProductoEntity {}

export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'string',
  })
  @Column({
    category: 'string',
  })
  @Column('decimal')
  price: number;
}
