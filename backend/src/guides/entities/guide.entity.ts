import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Image } from '../../images/entities/image.entity'; // Подключаем сущность Image

@Entity()
export class Guide {
  @PrimaryGeneratedColumn('uuid')
  id: string; // уникальный идентификатор гида

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  profileDescription: string; // описание гида

  @Column({ type: 'varchar', length: 255 })
  contactInfo: string; // контактная информация

  @Column({ type: 'float', default: 0 })
  rating: number; // рейтинг гида

  @OneToMany(() => Image, (image) => image.entityId) // Связь с изображениями
  images: Image[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
