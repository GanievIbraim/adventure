import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  tourId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tour, (tour) => tour)
  @JoinColumn({ name: 'tourId' })
  tour: Tour;
}
