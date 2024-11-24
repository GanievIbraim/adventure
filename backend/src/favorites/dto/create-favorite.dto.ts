import { IsNumber, IsPositive } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsNumber()
  @IsPositive()
  tourId: number;
}
