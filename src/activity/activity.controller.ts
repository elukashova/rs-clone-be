import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import { ActivityService, CreateActivityParams } from './activity.service';
import { ActivityResponseDto } from './dto/activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

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

  @Put(':id')
  updateActivity(
    @Param('id', ParseIntPipe) activityId: number,
    @User() user: UserTokenInfo,
    @Body() body: UpdateActivityDto,
  ) {
    return this.activityService.updateActivityById(user.id, activityId, body);
  }

  @Delete(':id')
  deleteActivity(@Param('id', ParseIntPipe) activityId: number) {
    return this.activityService.deleteActivity(activityId);
  }
}
