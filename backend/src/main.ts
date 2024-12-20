import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Разрешённый источник (фронтенд)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Разрешённые методы
    allowedHeaders: 'Content-Type, Accept', // Разрешённые заголовки
    credentials: true, // Разрешить отправку учётных данных (если необходимо)
  });
  /*
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
*/
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
