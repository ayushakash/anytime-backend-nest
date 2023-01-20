import { NestFactory,} from '@nestjs/core';
import {json} from 'body-parser';
import { AppModule } from './app.module';
import {urlencoded} from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(json({limit: '100mb'}));
  app.use(urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

  await app.listen(4000);
}
bootstrap();
