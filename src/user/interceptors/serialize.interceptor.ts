import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";
import { SerializeUser } from "../dtos/serialize-user.dto";




export class SerialInterceptor  implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
     return next.handle().pipe(map((data:any)=>{
        const serialize =plainToInstance(SerializeUser,data)

        return serialize
     }))
         
    }
}