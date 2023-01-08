import { IsDate, IsDateString, IsNotEmpty, IsUUID, MinLength } from "class-validator";

export class ProjectUsersDto { 


    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @IsNotEmpty()
    @IsUUID(4)
    projectId: string;

    @IsNotEmpty()
    @IsUUID(4)
    userId: string;
}