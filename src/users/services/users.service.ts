import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersDto } from "../dto/users.dto";
import { User } from "../user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    signup( body : UsersDto ) : Promise<User> {
        const newUser = this.usersRepository.create(body);
        return this.usersRepository.save(newUser); 
    }

    getAll() : Promise<User[]> {
        return this.usersRepository.find();
    }

    async getOneUserById( id : string ) {
        // console.log("------------------- id --------------------------")
        // console.log(id)
        let user = await this.usersRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException()
        } 
        return user;
    }

    getOneUserByUsername( username : string ) {
        return this.usersRepository.findOne({ where: { username: username } });
    }

    getOneUserByEmail( email : string ) {
        return this.usersRepository.findOne({ where: { email: email } });
    }

    me( username : string ): Promise<User> {
        return this.usersRepository.findOne({ where: { username: username } });
    }
}