import { Module } from '@nestjs/common';
import { RoutePointService } from './route-point.service';
import { RoutePointController } from './route-point.controller';
import { RoutePoint } from './entities/route-point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoutePoint])],
  controllers: [RoutePointController],
  providers: [RoutePointService],
})
export class RoutePointModule {}
