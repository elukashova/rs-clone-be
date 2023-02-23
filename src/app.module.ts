import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { FriendsModule } from './friends/friends.module';
import { NoFriendsModule } from './no-friends/no-friends.module';
import { ActivityModule } from './activity/activity.module';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot(),
    FriendsModule,
    NoFriendsModule,
    ActivityModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: [
        '/auth*',
        '/update*',
        '/friends*',
        '/no-friends*',
        '/activity*',
      ],
    }),
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
