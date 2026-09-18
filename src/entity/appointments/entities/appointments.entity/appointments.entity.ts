import { ProfessionalsEntity } from 'src/entity/professionals/professionals.entity/professionals.entity';
import { ServicesEntity } from 'src/entity/service/services.entity';
import { User } from 'src/usuario/entities/usuario.entity/usuario.entity';
// 1. FIXED IMPORT HERE:
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity('appointments')
export class AppointmentsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => ServicesEntity)
  service: ServicesEntity;

@ManyToOne("ProfessionalsEntity")
profesional: ProfessionalsEntity;

  @Column('timestamp')
  apppointment_date: Date;

  @Column({ default: false }) // Boolean defaults shouldn't be in quotes
  whatsapp_reminder: boolean;

  @Column('decimal')
  final_price: number;

  @Column('int')
  final_duration_minutes: number;

  @Column({ default: 'CONFIRMED' })
  status: string;


  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;
}