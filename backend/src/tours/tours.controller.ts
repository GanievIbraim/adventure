import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createTourDto: CreateTourDto, @Request() req) {
    const userId: string = req.user.id;
    console.log(req.user);
    return this.toursService.create(createTourDto, userId);
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTourDto: UpdateTourDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.toursService.update(id, updateTourDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.toursService.remove(id, userId);
  }
}
