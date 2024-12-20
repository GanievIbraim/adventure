import { Location } from 'src/locations/entities/location.entity';
import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TourSchedule } from 'src/tour-schedules/entities/tour-schedule.entity';

@Entity('tours')
export class Tour {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  organizer: User;

  @OneToMany(() => RoutePoint, (routePoint) => routePoint.tour, {
    cascade: true,
  })
  routePoints: RoutePoint[];

  @Column('json', { nullable: true })
  mediaUrls: string[];

  @ManyToOne(() => Location, (location) => location.tours)
  @JoinColumn({ name: 'locationId' })
  location: Location;

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

  @OneToMany(() => TourSchedule, (schedule) => schedule.tour, { cascade: true })
  schedules: TourSchedule[];
}
