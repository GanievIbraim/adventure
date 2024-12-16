import { Image } from 'src/images/entities/image.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @OneToMany(() => Image, (image) => image.entityId, { cascade: true })
  images: Image[];

  @ManyToMany(() => Tour, (tour) => tour.locations)
  @JoinTable()
  tours: Tour[];
}
