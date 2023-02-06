import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

interface SignupParams {
  name: string;
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
    name,
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
          name,
          email,
          password: hashedPassword,
          country,
        },
      });
    } else {
      user = await this.prismaService.user.create({
        data: {
          name,
          email,
          avatar_url,
        },
      });
    }

    return { token: this.generateJWT(name, user.id) };
  }

  async signin({ email, google, password }: SigninParams) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    if (!google) {
      const hashedPassword = user.password;

      const isValidPassword = await bcrypt.compare(password, hashedPassword);

      if (!isValidPassword) {
        throw new HttpException('Invalid credentials', 400);
      }
    }

    return { token: this.generateJWT(user.name, user.id) };
  }

  async getMe(id: string) {
    const user: User = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  private generateJWT(name: string, id: string) {
    return jwt.sign(
      {
        name,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 36000000,
      },
    );
  }
}
