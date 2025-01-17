import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
    )
    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
    });

    await app.listen(3000);
}
bootstrap();
