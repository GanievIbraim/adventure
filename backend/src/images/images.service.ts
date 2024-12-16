import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  // Получаем изображения для конкретной сущности
  async getImagesForEntity(
    entityType: string,
    entityId: string,
  ): Promise<Image[]> {
    return this.imageRepository.find({
      where: { entityType, entityId },
    });
  }

  // Создание нового изображения
  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    const { url, entityType, entityId } = createImageDto;

    const image = this.imageRepository.create({
      url,
      entityType,
      entityId,
    });

    return this.imageRepository.save(image);
  }

  // Удаление изображения
  async removeImage(imageId: string): Promise<void> {
    const image = await this.imageRepository.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new Error('Image not found');
    }

    await this.imageRepository.remove(image);
  }
}
