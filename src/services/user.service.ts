import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { comparePasswords, encodePassword } from './utils/bcrypt';
import { UserDto } from 'src/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable() export class UserService {
    public constructor(
        @InjectRepository(User) 
        private repository: Repository<User > ,
        private jwtService: JwtService) {}

    public getAll():Promise<User[] > {
        return this.repository.find();
    }

    public findOne(username: string){
        return this.repository.findOne({
            where: {
                username: username
            }
        })
    }

    public findOneById(id: string){
        return this.repository.findOne({
            where: {
                id: id
            }
        })
    }

    public create(insert: User):Promise<InsertResult > {
        return this.repository.insert(insert);
    }

    async register(user: UserDto):Promise<User > {
        const password = await encodePassword(user.password);
        const newUser = new User(user.username);
        newUser.password = password;

        return await this.repository.save(newUser);
    }

    async doesUserExists(createUserDTO: UserDto):Promise<boolean > {
        const user = await this.repository.findOne({ where: { username: createUserDTO.username } });
        if(user) {
            return true;
        }
        return false;
    }

    async login(userDto: UserDto): Promise< any >{
        const userData =  await this.findOne(userDto.username);
        if(!userData){
            return { status: 404 };
        }

        const matched = comparePasswords(userDto.password,  userData.password);
        if(!matched){
            return { status: 406};
        }

        const payload = { sub: userData.id, username: userData.username };
        const access_token = await this.jwtService.signAsync(payload, { secret: process.env.SECRET });
        
        
        return { 
            status: 200,
            access_token: access_token,
            id: userData.id
        };
    }
}
