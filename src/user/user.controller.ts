import { Body, Controller, Delete, Put } from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/user-update.dtos';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  updateUser(@User() user: UserTokenInfo, @Body() body: UpdateUserDto) {
    return this.userService.updateUserById(user.id, body);
  }

  @Delete()
  deleteUser(@User() user: UserTokenInfo) {
    return this.userService.deleteUser(user.id);
  }
}
