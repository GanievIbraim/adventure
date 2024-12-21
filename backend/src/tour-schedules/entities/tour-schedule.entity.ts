import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';

@Entity('tour-schedules')
export class TourSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tour, (tour) => tour.schedules, { eager: true })
  tour: Tour;

  @ManyToOne(() => User, (user) => user.schedules, { eager: true })
  guide: User;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @ManyToMany(() => User, (user) => user.schedules, { eager: true })
  @JoinTable()
  users: User[];
}
