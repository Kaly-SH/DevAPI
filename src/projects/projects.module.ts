import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUsersModule } from '../project-users/project-users.module';
import { UsersModule } from '../users/users.module';
import { ProjectController } from './controllers/projects.controller';
import { Project } from './project.entity';
import { ProjectService } from './services/project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        forwardRef(() => UsersModule),
        forwardRef(() => ProjectUsersModule)
        
    ],
    exports: [ProjectService],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectsModule {}
