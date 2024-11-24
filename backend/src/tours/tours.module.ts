import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutePoint } from 'src/route-points/entities/route-point.entity';
import { User } from 'src/users/entities/user.entity';
import { Tour } from './entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutePoint, User, Tour])],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
