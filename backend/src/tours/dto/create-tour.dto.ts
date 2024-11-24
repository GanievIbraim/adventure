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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoutePointDto)
  routePoints: CreateRoutePointDto[];
}
