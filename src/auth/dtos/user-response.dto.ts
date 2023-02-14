import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  country: string;
  bio: string;

  @Exclude()
  avatar_url: string;

  @Expose({ name: 'avatarUrl' })
  avatarUrl() {
    return this.avatar_url;
  }

  followees: FolloweeId[];
  followers: FollowerId[];

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

type FollowerId = {
  follower_id: string;
};

type FolloweeId = {
  followee_id: string;
};
