import { Module } from '@nestjs/common';
import { CartItem } from './entities/cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart])],
  controllers: [],
  providers: [],
})
export class CartItemsModule {}
