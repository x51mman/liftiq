import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.set('trust proxy', true);
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    app.use(helmet());

    await app.listen(3000);

    console.log('🚀 APP RUNNING ON 3000');
  } catch (error) {
    console.error('❌ ERROR:', error);
  }
}

bootstrap();