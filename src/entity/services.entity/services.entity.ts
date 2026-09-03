import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('services')
export class ServicesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
