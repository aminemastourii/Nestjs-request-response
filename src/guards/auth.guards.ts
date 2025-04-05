import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard  implements CanActivate {
        private logger = new Logger(AuthGuard.name);
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest(); // Get the HTTP request object

        this.logger.log(AuthGuard.name);
        return true; 
    }
 
}