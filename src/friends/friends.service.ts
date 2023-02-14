import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendsAddDto } from './dto/friends-add.dto';
import { FriendsResponseDto } from './dto/friends-response.dto';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriends(id: string): Promise<FriendsResponseDto[]> {
    const followers = await this.prismaService.user.findMany({
      where: {
        user_followers: {
          some: {
            follower_id: id,
          },
        },
      },
    });

    const filtered = followers.filter((follower) => follower.id !== id);
    return filtered.map((friend) => new FriendsResponseDto(friend));
  }

  async addFriend(id: string, data: FriendsAddDto) {
    await this.prismaService.followee.create({
      data: {
        user_id: id,
        followee_id: data.friendId,
      },
    });

    await this.prismaService.follower.create({
      data: {
        user_id: data.friendId,
        follower_id: id,
      },
    });

    return {};
  }

  async deleteFriend(id: string, data: FriendsAddDto) {
    await this.prismaService.followee.deleteMany({
      where: {
        user_id: id,
        followee_id: data.friendId,
      },
    });

    await this.prismaService.follower.create({
      data: {
        user_id: id,
        follower_id: data.friendId,
      },
    });

    return {};
  }

  // // async getFriends(id: string) {
  //   const info = await this.prismaService.user.findMany({
  //     where: {
  //       user_followers
  //     },
  //   });

  //   const friendsIds: string[] = info.reduce((acc, cur) => {
  //     acc.push(cur.followee_id);
  //     return acc;
  //   }, []);

  //   return friendsIds;

  // async getFriends(id: string) {
  //   const info = await this.prismaService.followee.findMany({
  //     where: {
  //       user_id: id,
  //     },
  //   });

  //   const friendsIds: string[] = info.reduce((acc, cur) => {
  //     acc.push(cur.followee_id);
  //     return acc;
  //   }, []);

  //   return friendsIds;
  // }
}
