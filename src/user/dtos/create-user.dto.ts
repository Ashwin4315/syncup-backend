import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsDate } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsOptional()
    decription: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsDate()
    @IsOptional()
    joinedAt: Date;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    profilePhoto: string;
}