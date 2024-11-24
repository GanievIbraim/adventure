import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guide } from '../../guides/entities/guide.entity';

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

  @ManyToOne(() => Guide, (guide) => guide.id, { onDelete: 'CASCADE' })
  guide: Guide;

  @Column({ type: 'varchar', length: 255 })
  pdfDocument: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
