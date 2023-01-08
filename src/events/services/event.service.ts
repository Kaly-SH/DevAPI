import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { EventDto } from "../dto/event.dto";
import { Event } from "../event.entity";

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>
    ) {}

    createEvent( userId : string , body : EventDto) : Promise<Event> {
        console.log("------------------- userId,body --------------------------")
        console.log(userId,body)
        const newEvent = this.eventRepository.create({
            userId,
            ...body
          });
        console.log("------------------- newEvent --------------------------")
        console.log(newEvent)
        return this.eventRepository.save(newEvent);
    }

}