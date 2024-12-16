import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from 'src/images/entities/image.entity';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':entityType/:entityId')
  async getImagesForEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ): Promise<Image[]> {
    return this.imagesService.getImagesForEntity(entityType, entityId);
  }

  @Post()
  async createImage(@Body() createImageDto: CreateImageDto): Promise<Image> {
    return this.imagesService.createImage(createImageDto);
  }

  @Delete(':imageId')
  async removeImage(@Param('imageId') imageId: string): Promise<void> {
    return this.imagesService.removeImage(imageId);
  }
}
