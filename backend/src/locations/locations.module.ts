import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/tours/entities/tour.entity';
import { Image } from 'src/images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Tour, Image])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
