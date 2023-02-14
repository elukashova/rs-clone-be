import { IsString } from 'class-validator';

export class FriendsAddDto {
  @IsString()
  friendId: string;
}
