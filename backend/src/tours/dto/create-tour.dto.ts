import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsInt()
  @Min(1)
  maxParticipants: number;

  @IsArray()
  @IsOptional()
  mediaUrls?: string[];

  @IsInt()
  @Min(1)
  @Max(5)
  difficulty: number;

  @IsString()
  @IsOptional()
  highlights?: string;

  @IsString()
  @IsOptional()
  importantInfo?: string;

  @IsString()
  @IsOptional()
  startTime?: string;

  @IsString()
  @IsOptional()
  included?: string;

  @IsString()
  @IsOptional()
  excluded?: string;

  @IsString()
  @IsOptional()
  locationId?: string;
}
