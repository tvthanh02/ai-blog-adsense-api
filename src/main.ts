import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  const config = new DocumentBuilder()
    .setTitle('AI Blog AdSense API')
    .setDescription('API documentation for AI Blog AdSense project')
    .setVersion('1.0')
    .addTag('authors')
    .addTag('posts')
    .addTag('categories')
    .addTag('comments')
    .addTag('uploads')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
