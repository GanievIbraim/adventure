import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  create(createTourDto: CreateTourDto) {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  async findAll(): Promise<Tour[]> {
    return this.tourRepository.find();
  }

  async findOne(id: number): Promise<Tour> {
    return this.tourRepository.findOne({ where: { id } });
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
