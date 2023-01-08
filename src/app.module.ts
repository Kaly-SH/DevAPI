/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProjectUsersModule } from './project-users/project-users.module';
import { ProjectsModule } from './projects/projects.module';
import { EventsModule } from './events/events.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { ProjectUsers } from './project-users/project-users.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUsers],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProjectUsersModule,
    ProjectsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
