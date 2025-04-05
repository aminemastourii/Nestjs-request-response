import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { RequestService } from "src/request.service";

@Injectable()
export class AuthenticationMiddleware  implements NestMiddleware {
    private logger = new Logger(AuthenticationMiddleware.name);
    constructor(private readonly requestservice:RequestService) {}


    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(AuthenticationMiddleware.name);
        //Authetication logic
        const user = '123'
        this.requestservice.setUserID(user);
        next();
    }
  
  }
