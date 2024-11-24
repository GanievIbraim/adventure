import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Tour)
    private tourRepository: Repository<Tour>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const favorite = this.favoriteRepository.create(createFavoriteDto);
    return this.favoriteRepository.save(favorite);
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      relations: ['user', 'tour'],
    });
  }

  async findOne(id: number): Promise<Favorite> {
    return this.favoriteRepository.findOne({
      where: { id },
      relations: ['user', 'tour'],
    });
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.update(id, updateFavoriteDto);
    return this.favoriteRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete(id);
    return { message: `Favorite with ID ${id} has been removed` };
  }
}
