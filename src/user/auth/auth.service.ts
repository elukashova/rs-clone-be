import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
  username: string;
  email: string;
  password: string;
  country: string;
}

interface SigninParams {
  email: string;
  password: string;
}

// interface Me {

// }

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup({ username, email, password, country }: SignupParams) {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        country,
      },
    });

    return { token: this.generateJWT(username, user.id) };
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    return { token: this.generateJWT(user.username, user.id) };
  }

  async getMe(id: string) {
    const user = await this.prismaService.user.findUnique({
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
