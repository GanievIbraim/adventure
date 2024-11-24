import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @IsEnum(['user', 'guide'])
  role: 'user' | 'guide';

  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;
}
