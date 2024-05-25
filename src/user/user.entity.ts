import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/event.entity";

@Entity()
export class User {
   
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column({default:"hi there I started using Syncup"})
    description:string;

   
    @Column({default:new Date()})
    joinedAt: Date;  

    @Column()
    password:string;

    @ManyToMany(() => Event, event => event.createdBy)
    createdEvents: Event[];
  
    @ManyToMany(() => Event, event => event.participants)
    @JoinTable()
    participatingEvents: Event[];

    @Column({default:"http://localhost:3000/user/default.jpg"})
    profilePhoto:string;

}