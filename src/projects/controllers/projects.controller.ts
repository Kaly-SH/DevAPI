import { Body, Get, Param, ForbiddenException, ClassSerializerInterceptor, Controller, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { UserService } from "../../users/services/users.service";
import { ProjectDto } from "../dto/projects.dto";
import { ProjectService } from "../services/project.service";
import { Project } from "../project.entity";

@Controller('projects')
// @UseInterceptors(ClassSerializerInterceptor)
@UsePipes(ValidationPipe)
export class ProjectController {

    constructor(private projectService: ProjectService, private userService: UserService) {}

    // -------------------------- POST --------------------------
    
    @Post()
    @UseGuards(JwtAuthGuard)
    async createProject(@Req() req,@Body() body:ProjectDto ) {
        // console.log("-------------------- createProject ---------------------")
        // console.log((await this.userService.getOneUserById(req.user.userId)).role)
        // console.log("---------------------------------------------------------")
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        const userVeriy = await this.userService.getOneUserById(body.referringEmployeeId)
        if (userRole !== 'Admin' || userVeriy.role == 'Employee') {
            throw new UnauthorizedException();
        }
        // console.log("---------------- body ----------------")
        // console.log(body)
        return this.projectService.createProject(body)
    }

    // -------------------------- GET --------------------------

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllProjects(@Req() req) : Promise<Project[]>{
        console.log("------------------ getAllProjects ------------------")
        console.log(this.projectService.getAll())
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectService.getAll();
        } else {
            throw new ForbiddenException();
        }
        
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOneProjectrById(@Req() req,@Param('id') id: string) {
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectService.getOneProjectById(id);
        } else {
            throw new ForbiddenException();
        }

    }
    
}