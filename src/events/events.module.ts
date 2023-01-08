import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Event]),
        
    ],
    exports: [EventService],
    controllers: [EventController],
    providers: [EventService]
})
export class EventsModule {}
