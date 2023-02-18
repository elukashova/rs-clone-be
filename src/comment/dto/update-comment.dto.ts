import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CommentResponseDto } from './create-comment.dto';

export class UpdatedCommentResponseDto {
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  likes: string[];
  @Exclude()
  userId: string;
  @Exclude()
  user: Partial<User>;

  body: string;

  updatedAt: Date;

  constructor(partial: Partial<CommentResponseDto>) {
    Object.assign(this, partial);
  }
}
