import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Tour])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
