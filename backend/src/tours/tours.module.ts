import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { User } from 'src/users/entities/user.entity';
import { Tour } from './entities/tour.entity';
import { Location } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/locations.service';
import { Image } from 'src/images/entities/image.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutePoint, User, Tour, Location, Image]),
  ],
  controllers: [ToursController],
  providers: [ToursService, LocationsService, UsersService],
})
export class ToursModule {}
