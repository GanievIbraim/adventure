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
import { LocationsModule } from './locations/locations.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { TourSchedulesModule } from './tour-schedules/tour-schedules.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        driver: require('mysql2'),
      }),
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
    TourSchedulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
