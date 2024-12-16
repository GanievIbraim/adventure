import { Location } from 'src/locations/entities/location.entity';
import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Schedule } from 'src/schedules/entities/schedule.entity';

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

  @ManyToOne(() => User, (user) => user.tours, { nullable: true })
  organizer: User; // Связь с пользователем (гидом)

  @OneToMany(() => RoutePoint, (routePoint) => routePoint.tour, {
    cascade: true,
  })
  routePoints: RoutePoint[];

  @Column('json', { nullable: true })
  mediaUrls: string[];

  @ManyToMany(() => Location, (location) => location.tours)
  locations: Location[];

  // Новые поля
  @Column({ type: 'int', default: 1 })
  difficulty: number;

  @Column({ type: 'text', nullable: true })
  highlights: string;

  @Column({ type: 'text', nullable: true })
  importantInfo: string;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'text', nullable: true })
  included: string;

  @Column({ type: 'text', nullable: true })
  excluded: string;

  @OneToMany(() => Schedule, (schedule) => schedule.tour, { cascade: true })
  schedules: Schedule[];
}
