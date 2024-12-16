import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  IsOptional,
  IsInt,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsDate()
  date: Date;

  @IsInt()
  maxParticipants: number;

  @IsArray()
  @IsOptional()
  mediaUrls?: string[];

  @IsInt()
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

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  locationIds?: number[];
}
