import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { Product } from '../../products/entities/product.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['user', 'guide'], default: 'user' })
  role: 'user' | 'guide'; // Роль: обычный пользователь или гид

  @Column({ nullable: true })
  name: string;

  // Поля для гида
  @Column('text', { nullable: true })
  profileDescription: string | null; // Описание профиля гида

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactInfo: string | null; // Контактная информация

  @Column({ type: 'float', default: 0 })
  rating: number; // Рейтинг (по умолчанию 0)

  @OneToMany(() => Image, (image) => image.entityId, { nullable: true })
  images: Image[]; // Изображения профиля гида

  @OneToMany(() => Product, (product) => product.guide, { nullable: true })
  products: Product[]; // Товары, связанные с гидом

  @OneToMany(() => Schedule, (schedule) => schedule.guide, { nullable: true })
  schedules: Schedule[]; // Расписание гида

  @OneToMany(() => Tour, (tour) => tour.organizer)
  tours: Tour[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
