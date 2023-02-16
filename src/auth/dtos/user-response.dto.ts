export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  country: string;
  bio: string;
  avatarUrl: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
