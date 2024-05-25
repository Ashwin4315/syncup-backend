import {
    Body,
    Controller,
    Get,
    Post,
    UseInterceptors,
    ValidationPipe,
    UploadedFile,
    Session,
    UseGuards,
    Patch
} from "@nestjs/common";
import { SerialInterceptor } from "./interceptors/serialize.interceptor";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UploadFile } from "./decorators/image-upload.decorator";



@Controller("auth")
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }


    @Post("signup")
    @UploadFile()
    @UseInterceptors(SerialInterceptor)
    async signup(
        @UploadedFile() file: Express.Multer.File,
        @Body(ValidationPipe) body: CreateUserDto,
        @Session() session: any) {
        const user = await this.authService.signup(body, file?.filename);
        session.userId = user.id;
        return user;
    }

    @Post("signin")
    @UseInterceptors(SerialInterceptor)
    async signin(
        @Body() body: { email: string, password: string },
        @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;

        return user;
    }


    @Get("whoAmI")
    @UseInterceptors(SerialInterceptor)
    @UseGuards(AuthGuard)
    whoamI(@CurrentUser() user) {
        return user
    }

    @Patch("updateMe")
    @UploadFile()
    @UseGuards(AuthGuard)
    @UseInterceptors(SerialInterceptor)
    updateMe(
        @CurrentUser() user,
        @Body() body: UpdateUserDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.userService.updateUser(user.id, body, file?.filename)
    }

    @Get("signout")
    signout(@Session() session: any) {
        session.userId = null;
    }
}