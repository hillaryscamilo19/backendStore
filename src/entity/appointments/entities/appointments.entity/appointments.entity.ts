import { ProfesionalEntity } from 'src/professionals/entities/profesional.entity/profesional.entity';
import { ServicesEntity } from 'src/services/entities/services.entity/services.entity';
import { User } from 'src/usuario/entities/usuario.entity/usuario.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity('appointments')
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ServicesEntity)
  service: ServicesEntity;

  @ManyToOne(() => ProfesionalEntity)
  profesional: ProfesionalEntity;

  @Column('timestamp')
  apppointment_date: Date;

  @Column({ default: 'false' })
  whatsapp_reminder: boolean;

  @Column('decimal')
  final_price: number;

  @Column('int')
  final_duration_minutes: number;

  @Column({ default: 'CONFIRMED' })
  status: string;
}
