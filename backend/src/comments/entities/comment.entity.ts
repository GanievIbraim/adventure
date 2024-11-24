import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Tour } from '../../tours/entities/tour.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => Tour, (tour) => tour.id, { onDelete: 'CASCADE' })
  tour: Tour;

  @CreateDateColumn()
  createdAt: Date;
}
