import { Body, Get, Param, ForbiddenException, ClassSerializerInterceptor, Controller, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { EventService } from "../services/event.service";

@Controller('event')
@UsePipes(ValidationPipe)
export class EventController {
    constructor(private eventService : EventService) {}
    
}