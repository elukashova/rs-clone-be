import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentResponseDto } from './dto/create-comment.dto';
import { UpdatedCommentResponseDto } from './dto/update-comment.dto';

export interface CreateCommentParams {
  activityId: number;
  body: string;
}

export interface UpdateCommentParams {
  body?: string;
  userId?: string;
  like?: string;
}

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(id: string, { activityId, body }: CreateCommentParams) {
    const newComment = await this.prismaService.comment.create({
      data: {
        activityId,
        userId: id,
        body,
      },
    });

    const commentReponse = await this.prismaService.comment.findUnique({
      where: {
        id: newComment.id,
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            avatarUrl: true,
            username: true,
          },
        },
      },
    });

    return new CommentResponseDto(commentReponse);
  }

  async updateComment(id: number, data: UpdateCommentParams) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException();
    }

    if (data.body) {
      const updatedComment = await this.prismaService.comment.update({
        where: {
          id,
        },
        data,
      });

      return new UpdatedCommentResponseDto(updatedComment);
    } else {
      if (data.userId && data.like) {
        await this.prismaService.like.create({
          data: {
            userId: data.userId,
            commentId: comment.id,
          },
        });
      } else if (data.userId && !data.like) {
        await this.prismaService.like.deleteMany({
          where: {
            commentId: comment.id,
            userId: data.userId,
          },
        });
      }
      const updatedComment = await this.prismaService.comment.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          body: true,
          createdAt: true,
          userId: true,
          likes: {
            select: {
              userId: true,
            },
          },
          user: {
            select: {
              avatarUrl: true,
              username: true,
            },
          },
        },
      });

      const newA = updatedComment.likes.map((like) => like.userId);
      Object.assign(updatedComment.likes, newA);

      return new CommentResponseDto(updatedComment);
    }
  }

  async deleteComment(id: number) {
    await this.prismaService.comment.delete({
      where: {
        id,
      },
    });

    return {};
  }
}
