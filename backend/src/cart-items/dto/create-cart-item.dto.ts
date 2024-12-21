import { IsString, IsArray, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  cartId: string;

  @IsString()
  tourId: string;

  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
