import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { UpdateModule } from './update/update.module';
import { FriendsModule } from './friends/friends.module';
import { NoFriendsModule } from './no-friends/no-friends.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    UpdateModule,
    FriendsModule,
    NoFriendsModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
