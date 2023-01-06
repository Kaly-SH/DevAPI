import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: string; //au format uuidv4
    
    @Column()
    date: Date;
    
    @Column({ default: 'Pending' })
    eventStatus: string;
    
    @Column()
    eventType: string;
    
    @Column()
    eventDescription: string;
    
    @Column()
    userId: string; //au format uuidv4
    
}
    