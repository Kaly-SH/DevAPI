import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectUsers {

    @PrimaryGeneratedColumn('uuid')
    id: string; //au format uuidv4
    
    @Column('date')
    startDate: Date;
    
    @Column('date')
    endDate: Date;
    
    @Column('uuid')
    projectId: string; //au format uuidv4
    
    @Column('uuid')
    userId: string; //au format uuidv4
    
}