import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UserService) { }

    async intercept(context: ExecutionContext, next: CallHandler) {

        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {}
        if (userId) {
            request.user = await this.userService.findById(userId);
        }
        return next.handle()
    }
}