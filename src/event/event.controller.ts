import { Controller, Get, Post, Body, Param, UseGuards, Patch, Query, UploadedFile } from '@nestjs/common';

import { Event } from './event.entity';
import { EventService } from './event.service';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEstimateDto } from './dto/create-estimate.dto';
import { EventImage } from './decorators/event-image.decorator';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get()
    async getAllEvents(): Promise<Event[]> {
        return this.eventService.getAllEvents();
    }

    @Get("id/:eventId")
    async getEventById(@Param("eventId") id: string): Promise<Event> {
        return this.eventService.getEventById(id);
    }

    @Post()
    @EventImage()
    @UseGuards(AuthGuard)
    async createEvent(
        @Body() eventData: CreateEventDto,
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: User

    ): Promise<Event> {
        return this.eventService.createEvent(eventData, user.id, file?.filename);
    }


    @Get("filter")
    getEstimate(@Query() query: GetEstimateDto) {
        return this.eventService.createEstimate(query);
    }

    @Patch('edit/:id')
    @UseGuards(AuthGuard)
    async updateEvent(
        @Param('id') id: string,
        @Body() eventData: Event,
        @CurrentUser() user: User,
    ): Promise<Event> {


        return this.eventService.updateEvent(id, eventData, user);
    }

    @Get('/info')
    @UseGuards(AuthGuard)
    async getInfo(
        @CurrentUser() user: User
    ) {
        return this.eventService.getInfo(user);
    }

    @Get('/registeredEvent')
    @UseGuards(AuthGuard)
    async getEventsByParticipantId(
        @CurrentUser() user: User
    ) {
        return this.eventService.getEventsByParticipantId(user.id);
    }

    @Get('/registeredEvent/:id')
    @UseGuards(AuthGuard)
    async isUserParticipantInEvent(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.eventService.isUserParticipantInEvent(id, user.id);
    }

    @Get('/register/:id')
    @UseGuards(AuthGuard)
    async registerForEvent(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.eventService.registerUserForEvent(id, user);
    }
}
