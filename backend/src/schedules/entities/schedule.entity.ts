import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.schedules)
  guide: User; // Пользователь (гид)

  @ManyToOne(() => Tour, { nullable: true })
  tour?: Tour; // Бронированный тур

  @ManyToOne(() => Product, { nullable: true })
  product?: Product; // Бронированный товар

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;
}
