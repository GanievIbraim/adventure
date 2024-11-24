import { IsNotEmpty, IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateGuideDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  profileDescription: string;

  @IsNotEmpty()
  @IsString()
  contactInfo: string;

  @IsNumber()
  rating: number;
}
