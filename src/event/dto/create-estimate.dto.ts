import {
  IsString,

  IsLongitude,
  IsLatitude,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
 

  @IsString()
  domain: string;

  @IsString()
  type: string;

  @IsDate()
  @Transform(({ value }) => value instanceof Date ? value : new Date(value)) 
  time: Date;



  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;
}
