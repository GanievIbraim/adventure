import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  date: Date;

  @Column()
  maxParticipants: number;

  @ManyToOne(() => User, (user) => user.tours)
  organizer: User;

  @OneToMany(() => RoutePoint, (routePoint) => routePoint.tour, {
    cascade: true,
  })
  routePoints: RoutePoint[];

  @Column('text', { array: true, nullable: true })
  mediaUrls: string[]; // Ссылки на изображения и видео
}
