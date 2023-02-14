import { Exclude, Expose } from 'class-transformer';

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
  // @Exclude()
  user_followers: Followers[];

  constructor(partial: Partial<FriendsResponseDto>) {
    Object.assign(this, partial);
  }
}

type Followers = {
  id: number;
  user_id: string;
  follower_id: string;
  created_at: Date;
  updated_at: Date;
};
