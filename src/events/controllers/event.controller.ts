import { Body, Get, Param, ForbiddenException, ClassSerializerInterceptor, Controller, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { EventDto } from "../dto/event.dto";
import { EventService } from "../services/event.service";

@Controller('events')
@UsePipes(ValidationPipe)
export class EventController {
    constructor(private eventService : EventService) {}

    // -------------------------- POST --------------------------
    
    @Post()
    @UseGuards(JwtAuthGuard)
    async createEvent (@Req() req,@Body() body:EventDto ){
        return this.eventService.createEvent(req.user.userId,body)
    }

}