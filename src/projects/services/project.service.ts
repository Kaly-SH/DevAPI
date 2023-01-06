import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectDto } from "../dto/projects.dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
    ) {}

    createProject( body : ProjectDto ) : Promise<Project> {
        const newProject = this.projectsRepository.create(body);
        return this.projectsRepository.save(newProject)
    }

    getAll() : Promise<Project[]> {
        return this.projectsRepository.find();
    }

    async getOneProjectById( id : string ) {
        // console.log("------------------- id --------------------------")
        // console.log(id)
        let project = await this.projectsRepository.findOneBy({id})
        if (!project) {
            throw new NotFoundException()
        } 
        return project;
    }
}