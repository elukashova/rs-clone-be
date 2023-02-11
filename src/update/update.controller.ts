import { Body, Controller, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { UpdateUserDto } from './dto/user-update.dtos';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private readonly authService: UpdateService) {}

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.authService.updateUserById(id, body);
  }
}
