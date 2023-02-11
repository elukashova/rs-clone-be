import { Controller, Post, Body, Get } from '@nestjs/common';
import { User, UserTokenInfo } from './decorators/auth.decorator';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import { AuthService } from './auth.service';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SignInDto) {
    return this.authService.signin(body);
  }

  @Get('/me')
  me(@User() user: UserTokenInfo): Promise<UserResponseDto> {
    return this.authService.getMe(user.id);
  }
}
