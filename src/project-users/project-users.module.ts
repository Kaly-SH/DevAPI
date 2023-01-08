import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectUsers } from './project-users.entity';
import { UsersModule } from '../users/users.module';
import { ProjectUsersController } from './controllers/project-users.controller';
import { ProjectUsersService } from './services/project-users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectUsers]),
        ProjectsModule,
        UsersModule
    ],
    exports: [ProjectUsersService],
    controllers: [ProjectUsersController],
    providers: [ProjectUsersService]
})
export class ProjectUsersModule {}
