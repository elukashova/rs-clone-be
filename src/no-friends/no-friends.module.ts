import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NoFriendsController } from './no-friends.controller';
import { NoFriendsService } from './no-friends.service';

@Module({
  imports: [PrismaModule],
  controllers: [NoFriendsController],
  providers: [
    NoFriendsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class NoFriendsModule {}
