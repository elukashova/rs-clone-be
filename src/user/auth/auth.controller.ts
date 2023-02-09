import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { User, UserTokenInfo } from '../decorators/user.decorator';
import {
  SignUpDto,
  SignInDto,
  UpdateUserDto,
  UserResponseDto,
} from '../dtos/auth.dtos';
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

  @Get('/me')
  me(@User() user: UserTokenInfo): Promise<UserResponseDto> {
    return this.authService.getMe(user.id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.authService.updateUserById(id, body);
  }
}
