import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UserService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { ProjectController } from './controllers/projects.controller';
import { Project } from './project.entity';
import { ProjectService } from './services/project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        UsersModule
    ],
    exports: [ProjectService],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectsModule {}
