import { IsString, IsArray, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsUUID()
  authorId: string;

  @IsUUID()
  tourId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}
