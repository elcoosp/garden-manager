import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Garden manager')
    .setDescription('Garden manager API')
    .setVersion('1.0')
    .addTag("auth")
    //.addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  writeFileSync('../mobile/swagger-spec.json', JSON.stringify(document, null, 2));
 
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();