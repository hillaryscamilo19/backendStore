import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('professionals')
export class ProfessionalsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ default: true })
  active: boolean;
}
