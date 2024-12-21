import { IsString, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsUUID()
  tourId: string;
}
