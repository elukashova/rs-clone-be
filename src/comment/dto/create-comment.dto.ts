import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CommentResponseDto {
  id: number;
  body: string;
  createdAt: Date;
  likes: { userId: string }[];
  userId: string;
  user: Partial<User>;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}
