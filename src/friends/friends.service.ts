import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendsResponseDto } from './dto/friends-response.dto';
import { FriendsAddDto } from './dto/friends-add.dto';
// import { FriendsResponseDto } from './dto/friends-response.dto';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriends(id: string) {
    const friends = await this.prismaService.follows.findMany({
      where: {
        followerId: id,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
            country: true,
            avatar_url: true,
            activities: true,
          },
        },
      },
    });

    // const filtered = followees.filter((follower) => follower.id !== id);
    return friends.map((friend) => new FriendsResponseDto(friend.following));
  }

  async addFriend(id: string, data: FriendsAddDto) {
    await this.prismaService.follows.create({
      data: {
        followerId: id,
        followingId: data.friendId,
      },
    });

    return {};
  }

  async deleteFriend(id: string, data: FriendsAddDto) {
    await this.prismaService.follows.deleteMany({
      where: {
        followerId: id,
        followingId: data.friendId,
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
