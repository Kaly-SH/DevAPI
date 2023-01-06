import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string; 
    
    @Column()
    name: string;
    
    @Column('uuid')
    referringEmployeeId: string; 

    @ManyToOne(() => User, user => user.projects )
    referringEmployee: User;

}