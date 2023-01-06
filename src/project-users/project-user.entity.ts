import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectUser {

    @PrimaryGeneratedColumn()
    id: string; //au format uuidv4
    
    @Column()
    startDate: Date;
    
    @Column()
    endDate: Date;
    
    @Column()
    projectId: string; //au format uuidv4
    
    @Column()
    userId: string; //au format uuidv4
    
}