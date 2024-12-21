import { Module } from '@nestjs/common';
import { RoutePoint } from './entities/route-point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoutePoint])],
  controllers: [],
  providers: [],
})
export class RoutePointModule {}
