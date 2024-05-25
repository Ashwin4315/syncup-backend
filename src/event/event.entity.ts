import { User } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
  
    @Column()
    description: string;
   
    @Column()
    time: Date;
  
    @Column()
    maxEnrollment: number;
  
    @Column()
    type: string;

    @Column()
    domain: string;
  
    @Column({ type: 'float' })
    lng: number;
  
    @Column({ type: 'float' })
    lat: number;

    // @Column()
    // venue: string;
  
    @Column()
    eventImage:string
  

    @ManyToOne(() => User, user => user.createdEvents)
    createdBy: User;

  
    @ManyToMany(() => User, user => user.participatingEvents)
    participants: User[];
}