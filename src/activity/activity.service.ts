import { Injectable, NotFoundException } from '@nestjs/common';
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
  mapId?: string;
}

interface UpdateActivityInfo {
  body?: string;
  kudos?: boolean;
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
        kudos: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            body: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
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

    return activities.map((activity) => {
      activity.comments.map((data) => {
        Object.assign(data, data.user);
        delete data.user;
        return data.user;
      });

      const newA = activity.kudos.map((kudo) => kudo.userId);
      Object.assign(activity.kudos, newA);

      return new ActivityResponseDto(activity);
    });
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
        kudos: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            body: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
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

    activity.comments.map((data) => {
      Object.assign(data, data.user);
      delete data.user;
      return data.user;
    });

    const newA = activity.kudos.map((kudo) => kudo.userId);
    Object.assign(activity.kudos, newA);

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
      mapId,
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

    if (startPoint && endPoint && travelMode && mapId) {
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
        kudos: {
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            body: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                avatarUrl: true,
                username: true,
              },
            },
          },
        },
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

    activityNew.comments.map((data) => {
      Object.assign(data, data.user);
      delete data.user;
      return data.user;
    });

    const newA = activityNew.kudos.map((kudo) => kudo.userId);
    Object.assign(activityNew.kudos, newA);

    return new ActivityResponseDto(activityNew);
  }

  async updateActivityById(
    id,
    activityId,
    { body, kudos }: UpdateActivityInfo,
  ) {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id: activityId,
      },
    });

    if (!activity) {
      throw new NotFoundException();
    }

    if (kudos && kudos === true) {
      await this.prismaService.kudo.create({
        data: {
          userId: id,
          activityId: activityId,
        },
      });
    }

    if (kudos === false) {
      await this.prismaService.kudo.deleteMany({
        where: {
          userId: id,
          activityId: activityId,
        },
      });
    }

    if (body) {
      await this.prismaService.comment.create({
        data: {
          userId: id,
          activityId: activityId,
          body: body,
        },
      });
    }

    // const activityNew = await this.prismaService.activity.findUnique({
    //   where: {
    //     id: activity.id,
    //   },
    //   select: {
    //     id: true,
    //     time: true,
    //     date: true,
    //     title: true,
    //     elevation: true,
    //     duration: true,
    //     sport: true,
    //     description: true,
    //     distance: true,
    //     companionId: true,
    //     kudos: {
    //       select: {
    //         userId: true,
    //       },
    //     },
    //     comments: {
    //       select: {
    //         body: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         user: {
    //           select: {
    //             avatarUrl: true,
    //             username: true,
    //           },
    //         },
    //       },
    //     },
    //     route: {
    //       select: {
    //         id: true,
    //         startPoint: true,
    //         endPoint: true,
    //         travelMode: true,
    //         mapId: true,
    //       },
    //     },
    //   },
    // });

    // activityNew.comments.map((data) => {
    //   Object.assign(data, data.user);
    //   delete data.user;
    //   return data.user;
    // });

    // const newA = activityNew.kudos.map((kudo) => kudo.userId);
    // Object.assign(activityNew.kudos, newA);
    // return new ActivityResponseDto(activityNew);
    return {};
  }
}
