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
  ) {}

  async create(createTourDto: CreateTourDto, id: string) {
    const { locationId, ...tourData } = createTourDto;
    console.log(id);

    const organizer = await this.usersService.findOneById(id);
    console.log(organizer);
    if (!organizer) {
      throw new HttpException('Organizer not found', HttpStatus.NOT_FOUND);
    }

    const tour = this.tourRepository.create({
      ...tourData,
      organizer,
    });
    console.log(locationId);
    if (locationId) {
      const location = await this.locationsService.findOneById(locationId);
      console.log(location);
      if (!location) {
        throw new HttpException('Location not found', HttpStatus.BAD_REQUEST);
      }

      tour.location = location;
    }

    return this.tourRepository.save(tour);
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

  async findOne(id: number): Promise<Tour> {
    return this.tourRepository.findOne({
      where: { id },
      relations: ['location'],
    });
  }

  async update(id: number, updateTourDto: UpdateTourDto, userId: string) {
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

  async remove(id: number, userId: string) {
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
