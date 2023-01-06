import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule,UsersModule,UserService],
    controllers: [UserController],
    providers: [UserService, AuthService, JwtService, LocalStrategy, JwtStrategy]
})
export class UsersModule {}
