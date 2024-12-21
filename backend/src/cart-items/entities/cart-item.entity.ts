import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Tour, { nullable: true, eager: true })
  tour?: Tour;

  @ManyToOne(() => Product, { nullable: true, eager: true })
  product?: Product;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'timestamp', nullable: true })
  bookingTime: Date;
}
