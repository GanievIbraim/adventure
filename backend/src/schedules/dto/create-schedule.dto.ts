import { IsDate, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;

  @IsOptional()
  userId?: string;

  @IsOptional()
  tourId?: number;
  @IsOptional()
  productId?: string;
}
