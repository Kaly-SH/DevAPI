import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsUUID, MinLength } from "class-validator";

export class EventDto { 

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    eventDescription: string;

    @IsNotEmpty()
    @IsIn(['RemoteWork','PaidLeave'])
    eventType: 'RemoteWork' | 'PaidLeave';

}