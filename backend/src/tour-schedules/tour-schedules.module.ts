import { Module } from '@nestjs/common';
import { TourSchedulesService } from './tour-schedules.service';
import { TourSchedulesController } from './tour-schedules.controller';
import { TourSchedule } from './entities/tour-schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from 'src/tours/entities/tour.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TourSchedule, User, Tour])],
  controllers: [TourSchedulesController],
  providers: [TourSchedulesService],
})
export class TourSchedulesModule {}
