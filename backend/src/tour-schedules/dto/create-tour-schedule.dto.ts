import { IsDate, IsArray, IsString } from 'class-validator';

export class CreateTourScheduleDto {
  @IsString()
  tourId: string;

  @IsString()
  guideId: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
