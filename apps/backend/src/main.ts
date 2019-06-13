/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
import { AppModule } from './app/app.module';

dotenv.config({path: process.cwd()+'/apps/backend/src/.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger: console});
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
