import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }


    async createUser(createUserDto: CreateUserDto, filename: string): Promise<User> {

        const isUserExist = await this.isEmailExist(createUserDto.email);

        if(filename){
            const path="http://localhost:3000/user/"+filename;
            createUserDto.profilePhoto=path;
        }

        if (isUserExist) {
            throw new BadRequestException("user already exist");
        }

        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async isEmailExist(email: string): Promise<boolean> {

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            return false;
        }
        return true;
    }

    async find(email:string){
       const user = await this.userRepository.findOne({ where: { email } })

       if(!user){
        throw new NotFoundException("no user exist with this email ")
       }
       return user ;
    }
    async findById(id:string){
        if(!id){
            return null;
        }
       const user = await this.userRepository.findOne({ where: { id } })

       if(!user){
        throw new NotFoundException("no user exist with this email ")
       }
       return user ;
    }

    async updateUser(id: string, updateUserDto:UpdateUserDto,filename:string): Promise<User> {

        if(filename){
            const path="http://localhost:3000/user/"+filename;
            updateUserDto.profilePhoto=path;
        }

        const user = await this.userRepository.findOne({where:{id}})
 
        if (!user) {
          throw new Error('User not found');
        }
    
        Object.assign(user, updateUserDto);
    
        return this.userRepository.save(user);
      }
}