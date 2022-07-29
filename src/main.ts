import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

// WARNING: DONT CHANGE THIS
export const HASH_SALT = bcrypt.genSaltSync(10);

async function bootstrap() {

  if (!process.env.ENVIRONMENT) {
    // tslint:disable-next-line: no-console
    console.warn('Check your .env file');
    return
  }

  const app = await NestFactory.create(AppModule);
  const appPort = process.env.SERVER_PORT ?? 3000;
  const apiVersion = process.env.API_VERSION ?? '0.0.1';

  const isntProd = !process.env.ENVIRONMENT?.includes('prod');

  const docs = process.env.SWAGGER_PATH ?? 'docs';

  if (isntProd) {
    const config = new DocumentBuilder()
      .setTitle('Basic Nestjs API')
      .setDescription('This is a prototype of a express api using typescript, nestjs, prisma and swagger')
      .setVersion(apiVersion)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'accessToken',
      )
      .addTag('Public', 'Accessed by anyone')
      .addTag('Common', 'Accessed by logged users')
      .addTag('Administrative', 'Accessed only by administrative users')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const options = {
      swaggerOptions: {
        tagsSorter: (tagA: string, tagB: string) => tagB.localeCompare(tagA),
        operationsSorter: 'alpha',
      },
    };
    SwaggerModule.setup(docs, app, document, options);
  }

  await app.listen(appPort, () => {
    if (isntProd) {
      // tslint:disable-next-line: no-console
      console.log(`\nBasic API (v${apiVersion})`);
      // tslint:disable-next-line: no-console
      console.log(`API URL: http://localhost:${appPort}`);
      // tslint:disable-next-line: no-console
      console.log(`Swagger: http://localhost:${appPort}/${docs}`);
    }
  });
}

bootstrap();
