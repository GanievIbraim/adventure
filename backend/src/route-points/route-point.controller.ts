import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutePointService } from './route-point.service';
import { CreateRoutePointDto } from './dto/create-route-point.dto';
import { UpdateRoutePointDto } from './dto/update-route-point.dto';

@Controller('route-point')
export class RoutePointController {
  constructor(private readonly routePointService: RoutePointService) {}

  @Post()
  create(@Body() createRoutePointDto: CreateRoutePointDto) {
    return this.routePointService.create(createRoutePointDto);
  }

  @Get()
  findAll() {
    return this.routePointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routePointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoutePointDto: UpdateRoutePointDto) {
    return this.routePointService.update(+id, updateRoutePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routePointService.remove(+id);
  }
}
