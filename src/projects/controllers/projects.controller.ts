import { Body, Get, Param, ForbiddenException, ClassSerializerInterceptor, Controller, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { UserService } from "../../users/services/users.service";
import { ProjectDto } from "../dto/projects.dto";
import { ProjectService } from "../services/project.service";
import { Project } from "../project.entity";
import { ProjectUsersService } from "../../project-users/services/project-users.service";

@Controller('projects')
// @UseInterceptors(ClassSerializerInterceptor)
@UsePipes(ValidationPipe)
export class ProjectController {

    constructor(private projectService: ProjectService, private userService: UserService, private projectUsersService: ProjectUsersService) {}

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
        // console.log("------------------ getAllProjects ------------------")
        // console.log(this.projectService.getAll())
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectService.getAll();
        } else {
            const projectUsers = await this.projectUsersService.getAllForUser(req.user.userId);
            const projectIds = projectUsers.map((pu) => pu.projectId);
            return this.projectService.getAllByIds(projectIds)
        }
        
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOneProjectrById(@Req() req,@Param('id') id: string) {
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectService.getOneProjectById(id);
        } else {
            const projectUsers = await this.projectUsersService.getAllForProject(id);
            
            // console.log("------------------ projectUsers ------------------")
            // console.log(projectUsers)
            // const UserProject = projectUsers.filter( id => id == req.user.userId)
            // console.log("------------------ UserProject ------------------")
            // console.log(UserProject)
            // const UsersIds = projectUsers.map((pu) => pu.userId);
            // console.log("------------------ UsersIds ------------------")
            // console.log(UsersIds)
            // if ( UsersIds.filter( id => id == req.user.userId).length < 1) {
            //     throw new ForbiddenException();
            // } else {
            //     console.log("------------------ filter ------------------")
            //     console.log(UsersIds.filter( id => id == req.user.userId))
            //     return UsersIds.filter( id => id == req.user.userId)
            // }
            
            if ( projectUsers.length < 1) {
                throw new ForbiddenException();
            } else {
                return this.projectService.getOneProjectById(projectUsers[0].projectId)
            }
            
        }

    }
    
}