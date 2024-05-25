import { Transform } from "class-transformer";
import { IsDate, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/user/user.entity";

export class CreateEventDto {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    @Transform(({ value }) => value instanceof Date ? value : new Date(value))
    time: Date;

    @IsNumber()
    maxEnrollment: number;

    @IsString()
    type: string;

    @IsString()
    domain: string;

    @IsNumber()
    @IsLongitude()
    lng: number;

    @IsNumber()
    @IsLatitude()
    lat: number;

    // @IsString()
    // venue: string;

    @IsOptional()
    eventImage: string;

    @IsOptional()
    createdBy: User;

    @IsOptional()
    participants: User[];


}