import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { TourSchedulesService } from './tour-schedules.service';
import { CreateTourScheduleDto } from './dto/create-tour-schedule.dto';
import { UpdateTourScheduleDto } from './dto/update-tour-schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tour-schedules')
@UseGuards(AuthGuard('jwt'))
export class TourSchedulesController {
  constructor(private readonly tourSchedulesService: TourSchedulesService) {}

  @Post()
  async create(
    @Body() createTourScheduleDto: CreateTourScheduleDto,
    @Request() req,
  ) {
    const userId: string = req.user.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.tourSchedulesService.create(userId, createTourScheduleDto);
  }

  @Get()
  async findAll(@Request() req) {
    const userId: string = req.user.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.tourSchedulesService.findAll(userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTourScheduleDto: UpdateTourScheduleDto,
    @Request() req,
  ) {
    const userId: string = req.user.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.tourSchedulesService.update(userId, id, updateTourScheduleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const userId: string = req.user.id;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.tourSchedulesService.remove(userId, id);
  }
}
