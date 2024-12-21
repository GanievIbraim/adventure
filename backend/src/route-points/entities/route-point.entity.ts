import { Tour } from 'src/tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('route_points')
export class RoutePoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Tour, (tour) => tour.routePoints)
  tour: Tour;
}
