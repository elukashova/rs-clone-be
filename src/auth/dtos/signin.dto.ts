import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  google: boolean;
}
