import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Location } from 'src/locations/entities/location.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async create(createTourDto: CreateTourDto) {
    const { locationIds, ...tourData } = createTourDto;

    const tour = this.tourRepository.create(tourData);

    if (locationIds && locationIds.length > 0) {
      const locations = await this.findByIds(locationIds);

      if (locations.length !== locationIds.length) {
        throw new Error('One or more locations not found');
      }

      tour.locations = locations;
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

  async addLocationToTour(tourId: number, locationId: number) {
    const tour = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: ['locations'],
    });
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
    });

    if (!tour || !location) {
      throw new Error('Tour or Location not found');
    }

    tour.locations.push(location);
    return this.tourRepository.save(tour);
  }

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find({ relations: ['locations'] });
  }

  async findOne(id: number): Promise<Tour> {
    return this.tourRepository.findOne({
      where: { id },
      relations: ['locations'],
    });
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }
    await this.tourRepository.update(id, updateTourDto);
    return this.tourRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new HttpException('Tour not found', HttpStatus.NOT_FOUND);
    }
    await this.tourRepository.delete(id);
    return { message: `Tour with ID ${id} has been removed` };
  }
}
