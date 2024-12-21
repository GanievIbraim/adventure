import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItemsModule } from 'src/cart-items/cart-items.module';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), CartItemsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
