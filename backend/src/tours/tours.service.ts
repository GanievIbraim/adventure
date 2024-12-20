import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import { LocationsService } from 'src/locations/locations.service';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/files/files.service';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { Image } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly imagesService: ImagesService,
  ) {}

  async create(createTourDto: CreateTourDto, userId: string, image?: any) {
    const { locationId, ...tourData } = createTourDto;

    // Проверяем организатора
    const organizer = await this.usersService.findOneById(userId);
    if (!organizer) {
      throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
    }

    // Создаём тур
    const tour = this.tourRepository.create({
      ...tourData,
      organizer,
    });

    // Проверяем наличие локации
    if (locationId) {
      const location = await this.locationsService.findOneById(locationId);
      if (!location) {
        throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
      }
      tour.location = location;
    }

    // Сохраняем тур
    const savedTour = await this.tourRepository.save(tour);

    // Если есть изображение, сохраняем его
    if (image) {
      const file = await this.filesService.createFile(image);
      const imageDto: CreateImageDto = {
        url: file.path, // или другой путь
        entityType: 'tour',
        entityId: savedTour.id,
      };
      await this.imagesService.createImage(imageDto); // Сохраняем изображение
    }

    return savedTour;
  }

  async findByIds(ids: number[]): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find({ relations: ['location'] });
  }

  async findOne(id: string): Promise<Tour> {
    return this.tourRepository.findOne({
      where: { id },
      relations: ['location'],
    });
  }

  async update(id: string, updateTourDto: UpdateTourDto, userId: string) {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });

    if (!tour) {
      throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }

    if (tour.organizer.id !== userId) {
      throw new HttpException(
        'Forbidden: You do not own this tour',
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(tour, updateTourDto);
    return this.tourRepository.save(tour);
  }

  async remove(id: string, userId: string) {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ['organizer'],
    });

    if (!tour) {
      throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }

    if (tour.organizer.id !== userId) {
      throw new HttpException(
        'Forbidden: You do not own this tour',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.tourRepository.delete(id);
    return { message: `Tour with ID ${id} has been removed` };
  }
}
