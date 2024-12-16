import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { RoutePointModule } from './route-points/route-point.module';
import { ToursModule } from './tours/tours.module';
import { UsersModule } from './users/users.module';
import { RescueRequestsModule } from './rescue-requests/rescue-requests.module';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { RoutePoint } from './route-points/entities/route-point.entity';
import { RescueRequest } from './rescue-requests/entities/rescue-request.entity';
import { Tour } from './tours/entities/tour.entity';
import { User } from './users/entities/user.entity';
import { LocationsModule } from './locations/locations.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { SchedulesModule } from './schedules/schedules.module';
import { CartItem } from './cart-items/entities/cart-item.entity';
import { Cart } from './carts/entities/cart.entity';
import { Image } from './images/entities/image.entity';
import { Location } from './locations/entities/location.entity';
import { Product } from './products/entities/product.entity';
import { Schedule } from './schedules/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Atelier_0809',
      database: 'adventure',
      autoLoadEntities: true,
      synchronize: true,
      driver: require('mysql2'),
    }),
    UsersModule,
    ToursModule,
    FavoritesModule,
    RoutePointModule,
    RescueRequestsModule,
    CommentsModule,
    LocationsModule,
    ImagesModule,
    ProductsModule,
    CartsModule,
    CartItemsModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
