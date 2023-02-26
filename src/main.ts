import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      `${configService.get('FRONT_URL')}`,
      process.env.FRONT_URL,
      process.env.DEPLOY_NETLIFY_URL,
      process.env.DEPLOY_RENDER_URL,
      'http://127.0.0.1:3000',
      'https://deploy-preview-45--the-big-bug-theory.netlify.app',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
