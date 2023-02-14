import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { FriendsAddDto } from './dto/friends-add.dto';
import { FriendsResponseDto } from './dto/friends-response.dto';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendService: FriendsService) {}

  @Get()
  getFriends(@User() user: UserTokenInfo): Promise<FriendsResponseDto[]> {
    return this.friendService.getFriends(user.id);
  }

  @Post()
  addFriend(@User() user: UserTokenInfo, @Body() body: FriendsAddDto) {
    return this.friendService.addFriend(user.id, body);
  }

  @Delete()
  deleteFriend(@User() user: UserTokenInfo, @Body() body: FriendsAddDto) {
    return this.friendService.deleteFriend(user.id, body);
  }
}
