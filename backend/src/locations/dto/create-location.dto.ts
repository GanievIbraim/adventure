import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
