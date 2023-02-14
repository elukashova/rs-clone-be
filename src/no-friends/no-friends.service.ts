import { Injectable } from '@nestjs/common';
import { FriendsResponseDto } from 'src/friends/dto/friends-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoFriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllNotFriends(id: string) {
    const notFriends = await this.prismaService.user.findMany({
      where: {
        followers: {
          none: {
            follower_id: id,
          },
        },
      },
    });
    const filtered = notFriends.filter((user) => user.id !== id);
    return filtered.map((friend) => new FriendsResponseDto(friend));
  }
}
