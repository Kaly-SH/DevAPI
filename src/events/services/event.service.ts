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

}