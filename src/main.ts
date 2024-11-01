import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger 설정
  const swaggerEnabled = configService.get<string>('SWAGGER_ENABLED') === 'true';
  if (swaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Food Info Project API')
      .setDescription('API documentation for the Food Info Project')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  app.setGlobalPrefix('api');
  app.enableCors();

  const PORT = 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}${swaggerEnabled ? '/api-docs' : ''}`);
}

bootstrap();