import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RescueRequestStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class RescueRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  requestData: string;

  @Column({
    type: 'enum',
    enum: RescueRequestStatus,
    default: RescueRequestStatus.PENDING,
  })
  status: RescueRequestStatus;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  guide: User;

  @Column({ type: 'varchar', length: 255 })
  pdfDocument: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
