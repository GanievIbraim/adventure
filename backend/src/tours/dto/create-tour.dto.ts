import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
  IsDate,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateRoutePointDto } from 'src/route-points/dto/create-route-point.dto';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @IsPositive()
  maxParticipants: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  difficulty?: number; // Сложность тура, необязательное поле

  @IsString()
  @IsOptional()
  highlights?: string; // Что важно знать

  @IsString()
  @IsOptional()
  importantInfo?: string; // Важная информация

  @IsString()
  @IsOptional()
  startTime?: string; // Время начала тура

  @IsOptional()
  @IsString()
  included?: string; // Что включено в тур

  @IsOptional()
  @IsString()
  excluded?: string; // Что не включено в тур

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutePointDto)
  routePoints: CreateRoutePointDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  locationIds?: number[];
}
