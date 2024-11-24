import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RescueRequestsService } from './rescue-requests.service';
import { CreateRescueRequestDto } from './dto/create-rescue-request.dto';
import { UpdateRescueRequestDto } from './dto/update-rescue-request.dto';

@Controller('rescue-requests')
export class RescueRequestsController {
  constructor(private readonly rescueRequestsService: RescueRequestsService) {}

  @Post()
  create(@Body() createRescueRequestDto: CreateRescueRequestDto) {
    return this.rescueRequestsService.create(createRescueRequestDto);
  }

  @Get()
  findAll() {
    return this.rescueRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rescueRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRescueRequestDto: UpdateRescueRequestDto) {
    return this.rescueRequestsService.update(+id, updateRescueRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rescueRequestsService.remove(+id);
  }
}
