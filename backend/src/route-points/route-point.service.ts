import { Injectable } from '@nestjs/common';
import { CreateRoutePointDto } from './dto/create-route-point.dto';
import { UpdateRoutePointDto } from './dto/update-route-point.dto';

@Injectable()
export class RoutePointService {
  create(createRoutePointDto: CreateRoutePointDto) {
    return 'This action adds a new routePoint';
  }

  findAll() {
    return `This action returns all routePoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routePoint`;
  }

  update(id: number, updateRoutePointDto: UpdateRoutePointDto) {
    return `This action updates a #${id} routePoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} routePoint`;
  }
}
