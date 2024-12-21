import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from 'src/cart-items/dto/create-cart-item.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCart(@Request() req) {
    const userId = req.user.id;
    return this.cartService.getActiveCart(userId);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addItem(@Body() createCartItemDto: CreateCartItemDto, @Request() req) {
    const userId = req.user.id;
    return this.cartService.addItemToCart(userId, createCartItemDto);
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard('jwt'))
  async removeItem(@Param('id') cartItemId: string, @Request() req) {
    const userId = req.user.id;
    return this.cartService.removeItemFromCart(userId, cartItemId);
  }

  @Delete('clear')
  @UseGuards(AuthGuard('jwt'))
  async clearCart(@Request() req) {
    const userId = req.user.id;
    await this.cartService.clearCart(userId);
  }
}
