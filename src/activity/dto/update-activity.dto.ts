import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActivityDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  body: string;

  @IsBoolean()
  @IsOptional()
  kudos: boolean;
}
