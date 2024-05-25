import { Exclude, Expose } from "class-transformer";
import { Event } from "src/event/event.entity";

export class SerializeUser {

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    description: string;

    @Expose()
    joinedAt: Date;

    @Exclude()
    password: string;

    @Expose()
    createdEvents: Event[];
    
    @Expose()
    participatingEvents: Event[];

    @Expose()
    profilePhoto: string;
}