import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string; //au format uuidv4
    
    @Column('date')
    date: Date;
    
    @Column({ default: 'Pending' })
    eventStatus: 'Pending' | 'Accepted' | 'Declined';
    
    @Column()
    eventType: 'RemoteWork' | 'PaidLeave';
    
    @Column('text')
    eventDescription: string;
    
    @Column('uuid')
    userId: string; //au format uuidv4
    
}
    