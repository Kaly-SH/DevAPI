import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectUsersDto } from "../dto/project-users.dto";
import { ProjectUsers } from "../project-users.entity";

@Injectable()
export class ProjectUsersService {

    constructor(
        @InjectRepository(ProjectUsers)
        private projectUsersRepository: Repository<ProjectUsers>,
    ) {}

    assignProjectToUser( body : ProjectUsersDto ) : Promise<ProjectUsers> {
        const newAssign = this.projectUsersRepository.create(body);
        return this.projectUsersRepository.save(newAssign)
    }

    getAll() : Promise<ProjectUsers[]> {
        return this.projectUsersRepository.find();
    }

    getAllForUser( OneUserId : string ) : Promise<ProjectUsers[]> {
        return this.projectUsersRepository.find({
            where: { userId: OneUserId },
        });
    }

    getAllForProject( OneProjectId : string ) : Promise<ProjectUsers[]> {
        return this.projectUsersRepository.find({
            where: { projectId: OneProjectId },
        });
    }

    async getOneById( id : string)  {
        let assign = await this.projectUsersRepository.findOneBy({id})
        if (!assign) {
            throw new NotFoundException()
        } 
        return assign;
    }
}