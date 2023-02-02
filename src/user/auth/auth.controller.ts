import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto, SignInDto } from '../dtos/auth.dtos';
import { AuthService } from './auth.service';

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
}
