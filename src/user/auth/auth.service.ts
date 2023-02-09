import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

interface SignupParams {
  username: string;
  email: string;
  google: boolean;
  password?: string;
  country?: string;
  avatar_url?: string;
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
    avatar_url,
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
          avatar_url,
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

  async getMe(id: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
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
