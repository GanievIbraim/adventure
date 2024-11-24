import { IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';
import { RescueRequestStatus } from '../entities/rescue-request.entity';

export class CreateRescueRequestDto {
  @IsNotEmpty()
  @IsString()
  requestData: string;

  @IsEnum(RescueRequestStatus)
  status: RescueRequestStatus;

  @IsNotEmpty()
  @IsUUID()
  guideId: string;

  @IsNotEmpty()
  @IsString()
  pdfDocument: string;
}
