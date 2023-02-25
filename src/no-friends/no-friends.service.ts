import { Injectable } from '@nestjs/common';
import { FriendsResponseDto } from 'src/friends/dto/friends-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoFriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllNotFriends(id: string) {
    const notFriends = await this.prismaService.user.findMany({
      where: {
        followedBy: {
          none: {
            followerId: id,
          },
        },
      },
      select: {
        id: true,
        username: true,
        country: true,
        avatarUrl: true,
        activities: {
          select: {
            id: true,
            time: true,
            date: true,
            title: true,
            elevation: true,
            duration: true,
            sport: true,
            description: true,
            distance: true,
            companionId: true,
            userId: true,
            user: {
              select: {
                username: true,
                avatarUrl: true,
              },
            },
            kudos: {
              select: {
                userId: true,
                user: {
                  select: {
                    avatarUrl: true,
                  },
                },
                createdAt: true,
              },
            },
            comments: {
              select: {
                id: true,
                body: true,
                createdAt: true,
                updatedAt: true,
                user: {
                  select: {
                    avatarUrl: true,
                    username: true,
                  },
                },
                userId: true,
                likes: {
                  select: {
                    userId: true,
                  },
                },
              },
            },
            route: {
              select: {
                id: true,
                startPoint: true,
                endPoint: true,
                travelMode: true,
                mapId: true,
              },
            },
          },
        },
      },
    });
    const filtered = notFriends.filter((user) => user.id !== id);
    filtered.forEach((noFriend) => {
      noFriend.activities.forEach((activity) => {
        activity.kudos.map((kudo) => {
          Object.assign(kudo, kudo.user);
          delete kudo.user;
        });

        Object.assign(activity, activity.user);
        delete activity.user;

        activity.comments.map((comment) => {
          Object.assign(comment, comment.user);
          delete comment.user;

          const newA = comment.likes.map((like) => like.userId);
          Object.assign(comment.likes, newA);
        });
      });
    });
    return filtered.map((person) => new FriendsResponseDto(person));
  }
}
