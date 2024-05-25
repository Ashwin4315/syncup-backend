import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {

    constructor(private userService: UserService) { }

    async signup(createUserdto: CreateUserDto, filename: string) {

        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(createUserdto.password, salt, 32)) as Buffer;

        const password = salt + "." + hash.toString('hex');
        createUserdto.password = password;

        return this.userService.createUser(createUserdto, filename )
    }

    async signin(email: string, password: string) {

        const user = await this.userService.find(email)
        const [salt, storedHash] = user.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('bad password');
        }

        return user;

    }

}