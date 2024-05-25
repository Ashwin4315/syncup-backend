import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Event,User]),UserModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
