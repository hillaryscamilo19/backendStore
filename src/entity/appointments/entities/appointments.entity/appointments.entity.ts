import { ProfessionalsEntity } from 'src/entity/professionals/professionals.entity/professionals.entity';
import { ServicesEntity } from 'src/entity/services.entity/services.entity';
import { User } from 'src/usuario/entities/usuario.entity/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity('appointments')
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ServicesEntity)
  service: ServicesEntity;

  @ManyToOne(() => ProfessionalsEntity)
  profesional: ProfessionalsEntity;

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
  startTime: string | number | Date;
  endTime: string | number | Date;
}
