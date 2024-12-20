import { Image } from 'src/images/entities/image.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Tour, (tour) => tour.location)
  tours: Tour[];
}
