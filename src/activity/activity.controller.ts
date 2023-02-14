import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { ActivityService, CreateActivityParams } from './activity.service';
import { ActivityResponseDto } from './dto/activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getActivities(@User() user: UserTokenInfo): Promise<ActivityResponseDto[]> {
    return this.activityService.getActivities(user.id);
  }

  @Get(':id')
  getActivity(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.getActivity(id);
  }

  @Post()
  createActivity(
    @User() user: UserTokenInfo,
    @Body() body: CreateActivityParams,
  ) {
    return this.activityService.createActivity(user.id, body);
  }
}
