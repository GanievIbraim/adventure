import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class LocationsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const { images, ...locationData } = createLocationDto;

    return this.dataSource.transaction(async (manager: EntityManager) => {
      const location = manager.create(Location, locationData);

      if (images?.length) {
        location.images = images.map((url) =>
          manager.create(Image, {
            url,
            entityType: 'location',
            entityId: null,
          }),
        );
      }

      const savedLocation = await manager.save(location);

      if (images?.length) {
        for (const image of location.images) {
          image.entityId = savedLocation.id;
        }
        await manager.save(location.images);
      }

      return savedLocation;
    });
  }

  async findAll() {
    return this.locationRepository.find();
  }

  async findOneById(id: string) {
    return this.locationRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const { images, ...locationData } = updateLocationDto;

    return this.dataSource.transaction(async (manager: EntityManager) => {
      const location = await manager.findOne(Location, {
        where: { id },
        relations: ['images'],
      });

      if (!location) {
        throw new NotFoundException('Location not found');
      }

      Object.assign(location, locationData);

      if (images?.length) {
        await manager.delete(Image, {
          entityType: 'location',
          entityId: id,
        });

        location.images = images.map((url) =>
          manager.create(Image, {
            url,
            entityType: 'location',
            entityId: id,
          }),
        );
      }

      return manager.save(location);
    });
  }

  async remove(id: string) {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      await manager.delete(Image, {
        entityType: 'location',
        entityId: id,
      });

      const result = await manager.delete(Location, id);

      if (result.affected === 0) {
        throw new NotFoundException('Location not found');
      }

      return result;
    });
  }
}
