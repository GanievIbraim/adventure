import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'user' | 'guide'; // Роль: обычный пользователь или гид

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Tour, (tour) => tour.organizer)
  tours: Tour[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
