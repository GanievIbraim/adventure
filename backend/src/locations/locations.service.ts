import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { images, ...locationData } = createLocationDto;

    const location = this.locationRepository.create(locationData);

    if (images?.length) {
      location.images = images.map((url) =>
        this.imageRepository.create({
          url,
          entityType: 'location',
          entityId: String(location.id),
        }),
      );
    }

    return this.locationRepository.save(location);
  }

  async findAll() {
    return this.locationRepository.find();
  }

  async findOneById(id: number) {
    return this.locationRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const { images, ...locationData } = updateLocationDto;

    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['images'],
    });

    if (!location) {
      throw new Error('Location not found');
    }

    Object.assign(location, locationData);

    if (images?.length) {
      await this.imageRepository.delete({
        entityType: 'location',
        entityId: String(location.id),
      });

      location.images = images.map((url) =>
        this.imageRepository.create({
          url,
          entityType: 'location',
          entityId: String(location.id),
        }),
      );
    }

    return this.locationRepository.save(location);
  }

  async remove(id: number) {
    await this.imageRepository.delete({
      entityType: 'location',
      entityId: String(id),
    });

    return this.locationRepository.delete(id);
  }
}
