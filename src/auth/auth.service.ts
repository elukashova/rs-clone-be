import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserResponseDto } from './dtos/user-response.dto';

interface SignupParams {
  username: string;
  email: string;
  google: boolean;
  password?: string;
  country?: string;
  avatarUrl?: string;
}

interface SigninParams {
  email: string;
  password?: string;
  google: boolean;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({
    username,
    email,
    google,
    password,
    country,
    avatarUrl,
  }: SignupParams) {
    const userExists: User = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new ConflictException();
    }

    let user: User;

    if (!google) {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      user = await this.prismaService.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          country,
        },
      });
    } else {
      user = await this.prismaService.user.create({
        data: {
          username,
          email,
          avatarUrl,
          password: '',
          country: '',
        },
      });
    }

    return { token: this.generateJWT(username, user.id) };
  }

  async signin({ email, google, password }: SigninParams) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }

    if (!google) {
      const hashedPassword = user.password;

      const isValidPassword = await bcrypt.compare(password, hashedPassword);

      if (!isValidPassword) {
        throw new HttpException('Invalid credentials', 401);
      }
    }

    return { token: this.generateJWT(user.username, user.id) };
  }

  async getMe(id: string): Promise<UserResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        country: true,
        avatarUrl: true,
        bio: true,
        sportTypes: true,
        challenges: true,
        birth: true,
        gender: true,
        followedBy: {
          select: {
            follower: {
              select: {
                id: true,
                username: true,
                country: true,
                avatarUrl: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                username: true,
                country: true,
                avatarUrl: true,
                challenges: true,
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
            },
          },
        },
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

    user.followedBy.map((data) => {
      Object.assign(data, data.follower);
      delete data.follower;
      return data.follower;
    });

    user.following.map((data) => {
      data.following.activities.forEach((activity) => {
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

      Object.assign(data, data.following);
      delete data.following;
      return data;
    });

    user.activities.forEach((activity) => {
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

    const newUser = new UserResponseDto(user);

    return newUser;
  }

  private generateJWT(username: string, id: string) {
    return jwt.sign(
      {
        username,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 36000000,
      },
    );
  }
}
