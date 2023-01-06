import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { SignInDto, UsersDto } from "../dto/users.dto";
import { UserService } from "../services/users.service";
import { User } from "../user.entity";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(ValidationPipe)
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {}

    // -------------------------- POST --------------------------
    
    @Post('auth/sign-up')
    signup(
        @Body() 
        body:UsersDto
        ):{} {
        return this.userService.signup(body)
    }

    @Post('auth/login')
    async login(
        @Body() body) {
        let user = await this.userService.getOneUserByEmail(body.email);
        if (!user || user.password !== body.password) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user)
    }

    // -------------------------- GET --------------------------
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUsers() : Promise<User[]>{
        return this.userService.getAll();
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(@Req() request) {
        return this.userService.me(request.user.username)
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOneUserById(@Param('id') id: string) {
        const uuidTest = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
        if (uuidTest.test(id) == false) {
            throw new BadRequestException();
        }
        let user = this.userService.getOneUserById(id)
        if (!user) {
            throw new NotFoundException();
        } else {
            return user
        }
    }
}
