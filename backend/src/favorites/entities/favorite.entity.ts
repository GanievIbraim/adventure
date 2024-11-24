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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // Внешний ключ как примитивное значение

  @Column()
  tourId: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Tour, (tour) => tour)
  @JoinColumn({ name: 'tourId' })
  tour: Tour;
}
