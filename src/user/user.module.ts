import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { UserController } from "./user.controller";
import { SerialInterceptor } from "./interceptors/serialize.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { CurrentUserMiddleware } from "./middleware/current-user.middleware";



@Module({

    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        AuthService,
        SerialInterceptor
    ],
        exports:[UserService]
})
export class UserModule { 

    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(CurrentUserMiddleware)
          .forRoutes('*');
      }
}