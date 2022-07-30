import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { RedocModule, RedocOptions } from 'nestjs-redoc';

dotenv.config();

// WARNING: DONT CHANGE THIS
export const HASH_SALT = bcrypt.genSaltSync(10);

async function bootstrap() {
  if (!process.env.ENVIRONMENT) {
    // tslint:disable-next-line: no-console
    console.warn(
      'Missing informations in .env file \n\nCheck if your .env file matches .env.example ',
    );
    return;
  }

  const app = await NestFactory.create(AppModule);
  const appPort = process.env.APP_PORT ?? 3000;

  const apiVersion = process.env.API_VERSION ?? '0.0.1';
  const apiTitle = process.env.API_TITLE;
  const apiDescription = process.env.API_DESCRIPTION;

  const isntProd = !process.env.ENVIRONMENT?.includes('prod');

  const swaggerPath = process.env.SWAGGER_PATH ?? 'swagger';
  const redocPath = process.env.REDOC_PATH ?? 'docs';

  if (isntProd) {
    const config = new DocumentBuilder()
      .setTitle(apiTitle)
      .setDescription(apiDescription)
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
        operationsSorter: (opA: any, opB: any) =>
          opB.get('path').localeCompare(opA.get('path')),
      },
    };

    const redocOptions: RedocOptions = {
      title: apiTitle,
      logo: {
        url: process.env.API_LOGO_URL,
        backgroundColor: '#F0F0F0',
        altText: apiTitle,
      },
      sortPropsAlphabetically: true,
      hideDownloadButton: false,
      hideHostname: false,
      auth: {
        enabled: true,
        user: process.env.DOC_USERNAME,
        password: process.env.DOC_PASSWORD,
      },
      tagGroups: [
        {
          tags: ['Public'],
          name: 'Accessed by anyone',
        },
        {
          tags: ['Common'],
          name: 'Accessed by logged users',
        },
        {
          tags: ['Administrative'],
          name: 'Accessed only by administrative users',
        },
      ],
    };

    if (swaggerPath) SwaggerModule.setup(swaggerPath, app, document, options);
    if (redocPath)
      await RedocModule.setup(redocPath, app as any, document, redocOptions);
  }

  await app.listen(appPort, () => {
    if (isntProd) {
      // tslint:disable-next-line: no-console
      console.log(`\n${apiTitle} (v${apiVersion})`);
      // tslint:disable-next-line: no-console
      console.log(`API root: http://localhost:${appPort}`);
      // tslint:disable-next-line: no-console
      if (swaggerPath)
        console.log(`Swagger: http://localhost:${appPort}/${swaggerPath}`);

      if (redocPath)
        console.log(`Documentation: http://localhost:${appPort}/${redocPath}`);
    }
  });
}

bootstrap();
