import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/event.entity';
import { User } from './user/user.entity';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'user'),
      serveRoot: '/user',
    }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'event'),
      serveRoot: '/event',
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "ashwin4315",
      database: "eventmanagement",
      entities: [Event, User],
      autoLoadEntities: true,
      synchronize: true
    }),
    EventModule,
    UserModule
  ],


})
export class AppModule { }
