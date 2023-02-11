import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  country: string;
  bio: string;

  @Exclude()
  avatar_url: string;

  @Expose({ name: 'avatarUrl' })
  avatarUrl() {
    return this.avatar_url;
  }

  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
