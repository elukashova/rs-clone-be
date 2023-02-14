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
  startLat?: string;
  startLng?: string;
  endLat?: string;
  endLng?: string;
  location?: string;
  travelMode?: string;
}

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActivities(id: string): Promise<ActivityResponseDto[]> {
    const activities = await this.prismaService.activity.findMany({
      where: {
        user_id: id,
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
        companion_id: true,
        kudos: true,
        comments: true,
        route: true,
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
        companion_id: true,
        kudos: true,
        comments: true,
        route: true,
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
      startLat,
      startLng,
      endLat,
      endLng,
      location,
      travelMode,
    }: CreateActivityParams,
  ) {
    const activity = await this.prismaService.activity.create({
      data: {
        user_id: id,
        time,
        date,
        title,
        elevation,
        duration,
        sport,
        description,
        distance,
        companion_id: companionId,
      },
    });

    await this.prismaService.route.create({
      data: {
        activity_id: activity.id,
        start_lat: startLat,
        start_lng: startLng,
        end_lat: endLat,
        end_lng: endLng,
        location: location,
        travel_mode: travelMode,
      },
    });

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
        companion_id: true,
        kudos: true,
        comments: true,
        route: true,
      },
    });
    return new ActivityResponseDto(activityNew);
  }
}
