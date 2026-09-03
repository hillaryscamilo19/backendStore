import { ServicesEntity } from 'src/services/entities/services.entity/services.entity';
import { Column, Entity } from 'typeorm';
import { ManyToOne } from 'typeorm/browser';

@Entity('extras')
export class ExtraEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  duration_minutes: number;

  @ManyToOne(() => ServicesEntity)
  service: ServicesEntity; // Relaciona qué extras pertenecen a qué servicio (ej. "Nail art" pertenece a "Uñas")
}
