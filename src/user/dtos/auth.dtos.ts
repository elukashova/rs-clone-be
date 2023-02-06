import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  // @IsString()
  // @MinLength(5)
  @IsOptional()
  password: string;

  // @IsString()
  // @IsNotEmpty()
  @IsOptional()
  country: string;

  // @IsString()
  @IsOptional()
  avatar_url: string;

  @IsBoolean()
  google: boolean;
}

export class SignInDto {
  @IsEmail()
  email: string;

  // @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  google: boolean;
}
