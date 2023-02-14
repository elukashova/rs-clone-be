import { Controller, Get } from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { NoFriendsService } from './no-friends.service';

@Controller('no-friends')
export class NoFriendsController {
  constructor(private readonly noFriendService: NoFriendsService) {}

  @Get()
  getAllNotFriends(@User() user: UserTokenInfo) {
    return this.noFriendService.getAllNotFriends(user.id);
  }
}
