import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';

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

  @IsOptional()
  @IsArray()
  challenges: string[];

  @IsOptional()
  @IsArray()
  sportTypes: string[];

  @IsOptional()
  @IsString()
  birth: string;

  @IsOptional()
  @IsString()
  gender: string;
}
