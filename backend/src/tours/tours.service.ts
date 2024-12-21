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
import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(RoutePoint)
    private readonly routePointRepository: Repository<RoutePoint>,
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly imagesService: ImagesService,
  ) {}

  // Создание тура
  async create(createTourDto: CreateTourDto, userId: string, image?: any) {
    const { locationId, routePoints, ...tourData } = createTourDto;

    const organizer = await this.usersService.findOneById(userId);
    if (!organizer) {
      throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
    }

    const tour = this.tourRepository.create({
      ...tourData,
      organizer,
    });

    if (locationId) {
      const location = await this.locationsService.findOneById(locationId);
      if (!location) {
        throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
      }
      tour.location = location;
    }

    // Сохраняем тур
    const savedTour = await this.tourRepository.save(tour);

    // Сохраняем маршрутные точки
    if (routePoints && routePoints.length) {
      const points = routePoints.map((point) =>
        this.routePointRepository.create({ ...point, tour: savedTour }),
      );
      await this.routePointRepository.save(points);
    }

    // Если есть изображение, сохраняем его
    if (image) {
      const file = await this.filesService.createFile(image);
      const imageDto: CreateImageDto = {
        url: file.path,
        entityType: 'tour',
        entityId: savedTour.id,
      };
      await this.imagesService.createImage(imageDto);
    }

    return savedTour;
  }

  // Получение всех туров
  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find({
      relations: ['location', 'routePoints'],
    });
  }

  // Получение тура по ID
  async findOne(id: string): Promise<Tour> {
    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ['location', 'routePoints'],
    });

    if (!tour) {
      throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }

    return tour;
  }

  // Обновление тура
  async update(id: string, updateTourDto: UpdateTourDto, userId: string) {
    const { routePoints, ...tourData } = updateTourDto;

    const tour = await this.tourRepository.findOne({
      where: { id },
      relations: ['organizer', 'routePoints'],
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

    Object.assign(tour, tourData);

    if (routePoints) {
      await this.routePointRepository.delete({ tour: { id } });

      const newPoints = routePoints.map((point) =>
        this.routePointRepository.create({ ...point, tour }),
      );
      await this.routePointRepository.save(newPoints);
    }

    return this.tourRepository.save(tour);
  }

  // Удаление тура
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

    // Удаляем тур (включая каскадное удаление маршрутных точек)
    await this.tourRepository.delete(id);

    return { message: `Tour with ID ${id} has been removed` };
  }
}
