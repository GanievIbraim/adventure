import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Уникальный идентификатор картинки

  @Column({ type: 'varchar', length: 255 })
  url: string; // URL картинки

  @Column({ type: 'varchar', length: 50 })
  entityType: string; // Тип сущности (например, 'guide', 'tour', 'location')

  @Column({ type: 'uuid' })
  entityId: string; // ID сущности (например, ID гида, тура или локации)

  @Column({ type: 'varchar', nullable: true })
  description: string; // Описание изображения (по желанию)
}
