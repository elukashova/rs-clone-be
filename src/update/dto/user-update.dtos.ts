import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  avatarUrl: string;

  @IsString()
  @IsOptional()
  bio: string;
}
