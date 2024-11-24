import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateRoutePointDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  description?: string;
}
