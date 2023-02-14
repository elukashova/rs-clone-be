import { Body, Controller, Put } from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { UpdateUserDto } from './dto/user-update.dtos';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly authService: UpdateService) {}

  @Put()
  updateUser(@User() user: UserTokenInfo, @Body() body: UpdateUserDto) {
    return this.authService.updateUserById(user.id, body);
  }
}
