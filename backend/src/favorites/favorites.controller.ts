import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req: any) {
    const userId = req.user.id;
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    var userId = req.user.id;
    return this.favoriteService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    var userId = req.user.id;
    return this.favoriteService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
    @Request() req: any,
  ) {
    var userId = req.user.id;
    return this.favoriteService.update(id, updateFavoriteDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    var userId = req.user.id;
    return this.favoriteService.remove(id, userId);
  }
}
