import { IsNotEmpty, IsUUID, MinLength } from "class-validator";

export class ProjectDto { 
    
    @IsNotEmpty()
    @MinLength(3)
    name: string;
    
    @IsNotEmpty()
    @IsUUID(4)
    referringEmployeeId: string; 

}