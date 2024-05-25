import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface CustomSession {
  userId?: string;
}

declare module 'express-session' {
  interface SessionData {
    user?: CustomSession;
  }
}


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UserService) {}

  async use(req: Request  & { session: CustomSession }, res: Response, next: NextFunction) {

    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findById(userId);
      req.user = user;
    }

    next();
  }
}
