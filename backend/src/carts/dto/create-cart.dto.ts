import { IsString, IsArray, IsInt, Min } from 'class-validator';

export class CreateCartDto {
  @IsString()
  user: string;

  @IsArray()
  @IsString({ each: true })
  items: string[];
}
