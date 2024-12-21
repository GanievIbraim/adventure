import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ToursModule } from 'src/tours/tours.module';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';
import { ImagesModule } from 'src/images/images.module';
import { User } from 'src/users/entities/user.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Image } from 'src/images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Tour, Image]),
    UsersModule,
    FilesModule,
    ImagesModule,
    ToursModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
