import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { RoutePointModule } from './route-points/route-point.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';
import { GuidesModule } from './guides/guides.module';
import { RescueRequestsModule } from './rescue-requests/rescue-requests.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { RoutePoint } from './route-points/entities/route-point.entity';
import { Guide } from './guides/entities/guide.entity';
import { RescueRequest } from './rescue-requests/entities/rescue-request.entity';
import { Tour } from './tours/entities/tour.entity';
import { User } from './users/entities/user.entity';
import { LocationsModule } from './locations/locations.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'adventure',
        autoLoadEntities: true,
        entities: [
          User,
          Guide,
          Tour,
          Favorite,
          RescueRequest,
          Comment,
          RoutePoint,
        ],
        synchronize: true,
      }),
    }),
    UsersModule,
    ToursModule,
    FavoritesModule,
    RoutePointModule,
    GuidesModule,
    RescueRequestsModule,
    CommentsModule,
    LocationsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
