import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Product } from 'src/products/entities/product.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto } from 'src/cart-items/dto/create-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async getActiveCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ['items', 'items.tour', 'items.product'],
    });

    if (!cart) {
      cart = this.cartRepository.create({
        user: { id: userId },
        isActive: true,
      });
      await this.cartRepository.save(cart);
    }

    return cart;
  }

  async addItemToCart(
    userId: string,
    createCartItemDto: CreateCartItemDto,
  ): Promise<Cart> {
    const cart = await this.getActiveCart(userId);

    const existingItem = cart.items.find(
      (item) =>
        (createCartItemDto.tourId &&
          item.tour?.id === createCartItemDto.tourId) ||
        (createCartItemDto.productId &&
          item.product?.id === createCartItemDto.productId),
    );

    if (existingItem) {
      existingItem.quantity += createCartItemDto.quantity || 1;
      await this.cartItemRepository.save(existingItem);
    } else {
      const newItem = this.cartItemRepository.create({
        cart,
        tour: createCartItemDto.tourId
          ? { id: createCartItemDto.tourId }
          : undefined,
        product: createCartItemDto.productId
          ? { id: createCartItemDto.productId }
          : undefined,
        quantity: createCartItemDto.quantity || 1,
      });
      await this.cartItemRepository.save(newItem);
    }

    return this.getActiveCart(userId);
  }

  async removeItemFromCart(userId: string, cartItemId: string): Promise<Cart> {
    const cart = await this.getActiveCart(userId);
    const item = cart.items.find((item) => item.id === cartItemId);

    if (!item) {
      throw new Error('Cart item not found');
    }

    await this.cartItemRepository.remove(item);
    return this.getActiveCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.getActiveCart(userId);
    await this.cartItemRepository.remove(cart.items);
  }
}
