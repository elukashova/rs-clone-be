import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityResponseDto } from './dto/activity.dto';

export interface CreateActivityParams {
  time: string;
  date: Date;
  title: string;
  elevation: string;
  duration: string;
  sport: string;
  description?: string;
  distance?: string;
  companionId?: string;
  startPoint?: string;
  endPoint?: string;
  travelMode?: string;
}

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActivities(id: string): Promise<ActivityResponseDto[]> {
    const activities = await this.prismaService.activity.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        time: true,
        date: true,
        title: true,
        elevation: true,
        duration: true,
        sport: true,
        description: true,
        distance: true,
        companionId: true,
        kudos: true,
        comments: true,
        route: {
          select: {
            id: true,
            startPoint: true,
            endPoint: true,
            travelMode: true,
            mapId: true,
          },
        },
      },
    });

    return activities.map((activity) => new ActivityResponseDto(activity));
  }

  async getActivity(id: number): Promise<ActivityResponseDto> {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        time: true,
        date: true,
        title: true,
        elevation: true,
        duration: true,
        sport: true,
        description: true,
        distance: true,
        companionId: true,
        kudos: true,
        comments: true,
        route: {
          select: {
            id: true,
            startPoint: true,
            endPoint: true,
            mapId: true,
            travelMode: true,
          },
        },
      },
    });
    return new ActivityResponseDto(activity);
  }

  async createActivity(
    id: string,
    {
      time,
      date,
      title,
      elevation,
      duration,
      sport,
      description,
      distance,
      companionId,
      startPoint,
      endPoint,
      travelMode,
    }: CreateActivityParams,
  ) {
    const activity = await this.prismaService.activity.create({
      data: {
        userId: id,
        time,
        date,
        title,
        elevation,
        duration,
        sport,
        description,
        distance,
        companionId: companionId,
      },
    });

    if (startPoint && endPoint && travelMode) {
      await this.prismaService.route.create({
        data: {
          activityId: activity.id,
          startPoint: startPoint,
          endPoint: endPoint,
          travelMode: travelMode,
        },
      });
    }

    const activityNew = await this.prismaService.activity.findUnique({
      where: {
        id: activity.id,
      },
      select: {
        id: true,
        time: true,
        date: true,
        title: true,
        elevation: true,
        duration: true,
        sport: true,
        description: true,
        distance: true,
        companionId: true,
        kudos: true,
        comments: true,
        route: {
          select: {
            id: true,
            startPoint: true,
            endPoint: true,
            travelMode: true,
            mapId: true,
          },
        },
      },
    });
    return new ActivityResponseDto(activityNew);
  }
}
