import { Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDto } from 'src/auth/dtos/user-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface UpdateUserInfo {
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  avatarUrl?: string;
  challenges?: string[];
  sportTypes?: string[];
  birth?: string;
  gender?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUserById(id: string, data: UpdateUserInfo) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });

    return new UserResponseDto(updatedUser);
  }

  async deleteUser(id: string) {
    await this.prismaService.user.deleteMany({
      where: {
        id,
      },
    });

    return {};
  }
}
