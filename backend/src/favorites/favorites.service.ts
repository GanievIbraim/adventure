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
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: string) {
    const favorite = this.favoriteRepository.create({
      userId,
      ...createFavoriteDto,
    });
    return this.favoriteRepository.save(favorite);
  }

  async findAll(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { userId },
      relations: ['user', 'tour'],
    });
  }

  async findOne(id: string, userId: string): Promise<Favorite> {
    const favorite = await this.favoriteRepository.findOne({
      where: { id, userId },
      relations: ['user', 'tour'],
    });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    return favorite;
  }

  async update(
    id: string,
    updateFavoriteDto: UpdateFavoriteDto,
    userId: string,
  ) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id, userId },
    });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.update(id, updateFavoriteDto);
    return this.favoriteRepository.findOne({ where: { id } });
  }

  async remove(id: string, userId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id, userId },
    });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete(id);
    return { message: `Favorite with ID ${id} has been removed` };
  }
}
