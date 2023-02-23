import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from 'src/auth/dtos/user-response.dto';

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
export class UpdateService {
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
}
