import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profileDescription?: string;

  @IsOptional()
  @IsString()
  contactInfo?: string;

  @IsEnum(['user', 'guide'])
  role: 'user' | 'guide';
}
