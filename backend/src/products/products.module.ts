import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, CartItem])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
