import { Exclude } from 'class-transformer';

export class FriendsResponseDto {
  id: string;
  username: string;

  @Exclude()
  email: string;
  @Exclude()
  password: string;

  country: string;

  @Exclude()
  bio: string;

  avatarUrl: string;

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<FriendsResponseDto>) {
    Object.assign(this, partial);
  }
}
