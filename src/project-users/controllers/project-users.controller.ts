import { Body, Get, Param, ForbiddenException, ClassSerializerInterceptor, Controller, Post, Req, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ConflictException, NotFoundException } from "@nestjs/common/exceptions";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AuthService } from "../../auth/services/auth.service";
import { ProjectService } from "../../projects/services/project.service";
import { UserService } from "../../users/services/users.service";
import { ProjectUsersDto } from "../dto/project-users.dto";
import { ProjectUsers } from "../project-users.entity";
import { ProjectUsersService } from "../services/project-users.service";


@Controller('project-users')
// @UseInterceptors(ClassSerializerInterceptor)
@UsePipes(ValidationPipe)
export class ProjectUsersController {

    constructor(private projectUsersService: ProjectUsersService, private userService: UserService,private projectService: ProjectService) {}
    
    // -------------------------- POST --------------------------
    
    @Post()
    @UseGuards(JwtAuthGuard)
    async createProjectUsers (@Req() req,@Body() body:ProjectUsersDto ){
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        
        if (userRole == 'Employee') {
            throw new UnauthorizedException();
        } else {
            const project = (await this.projectService.getOneProjectById(body.projectId))
            const user = (await this.userService.getOneUserById(body.userId))
            if ( project == null || user == null) {
                throw new NotFoundException();
            } else {
                const userProjects = (await this.projectUsersService.getAllForUser(body.userId))
                if ( userProjects == null) {
                    return this.projectUsersService.assignProjectToUser(body)
                } else {
                    const startDate = new Date(body.startDate);
                    const endDate = new Date(body.endDate);
                    const overlappingProjects = userProjects.filter(
                        (project) => {
                            const projectStartDate = new Date(project.startDate);
                            const projectEndDate = new Date(project.endDate);
                            return projectStartDate <= endDate && projectEndDate >= startDate;
                        }
                    );
                      
                    if (overlappingProjects.length > 0) {
                        throw new ConflictException();
                    }
                }
            }
            return this.projectUsersService.assignProjectToUser(body)
        }
    }

    // -------------------------- GET --------------------------

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(@Req() req) : Promise<ProjectUsers[]> {
        // console.log("------------------ getAll ------------------")
        // console.log(this.projectUsersService.getAll())
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectUsersService.getAll();
        } else {
            return this.projectUsersService.getAllForUser(req.user.userId)
        }

    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOneById(@Req() req,@Param('id') id: string) {
        const userRole = (await this.userService.getOneUserById(req.user.userId)).role
        if (userRole !== 'Employee') {
            return this.projectUsersService.getOneById(id);
        } else {
            throw new ForbiddenException();
        }

    }
}