
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { GetEstimateDto } from './dto/create-estimate.dto';
import { FindManyOptions } from 'typeorm';


@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly userService: UserService
  ) { }

  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventRepository.find({ relations: ['participants', "createdBy"] });

    events.forEach(event => {
      if (event.createdBy) {
        delete event.createdBy.password;
      }
      event.participants.forEach(user => {
        delete user.password;
      });
    });


    return events;
  }


  async createEvent(eventData: Event, id: string, filename: any): Promise<Event> {

    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    console.log(filename)

    if (!filename) {
      throw new BadRequestException("event image is required")
    }

    const path = "http://localhost:3000/event/" + filename;
    eventData.eventImage = path;

    eventData.createdBy = user;

    const newEvent = this.eventRepository.create(eventData);
    return this.eventRepository.save(newEvent);
  }





  async registerUserForEvent(id: string, user: User) {

    const event = await this.eventRepository.findOne({ where: { id }, relations: ['participants', "createdBy"] });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.participants) {
      event.participants.push(user);

    }
    return this.eventRepository.save(event);

  }

  async getInfo(user: User) {

    return this.eventRepository.find({
      where: {
        createdBy: { id: user.id }
      },
      relations: ['participants', 'createdBy']
    })


  }







  async getEventsByParticipantId(participantId: string): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      .innerJoin('event.participants', 'participant')
      .where('participant.id = :participantId', { participantId })
      .getMany();
  }


  async isUserParticipantInEvent(eventId: string, userId: string): Promise<boolean> {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.participants', 'participant')
      .where('event.id = :eventId', { eventId })
      .andWhere('participant.id = :userId', { userId })
      .getOne();

    return !!event;
  }








  async getEventById(id: string) {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['participants', "createdBy"] });
    if (!event) {
      throw new NotFoundException('Event not found');

    }
    return event
  }


  async updateEvent(id: string, eventData: Event, user: User): Promise<Event> {

    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    Object.assign(event, eventData);

    return this.eventRepository.save(event);
  }



  async createEstimate({ lng, lat, domain, time, type }: GetEstimateDto) {
    let query = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.participants', 'participants')
      .leftJoinAndSelect('event.createdBy', 'createdBy')
      .andWhere('event.time > :time', { time })
      .andWhere('lng - :lng BETWEEN -50 AND 50', { lng })
      .andWhere('lat - :lat BETWEEN -50 AND 50', { lat })

    if (type) {
      query = query.andWhere('event.type = :type', { type });
    }
    if (domain) {
      query = query.andWhere('event.domain = :domain', { domain });
    }

    const events = await query.getMany();

    return events;
  }

}
