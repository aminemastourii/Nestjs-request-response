import { CallHandler, 
    ExecutionContext, 
    Injectable, Logger, 
    NestInterceptor } from "@nestjs/common"
import { Observable, tap } from "rxjs";
import { RequestService } from "src/request.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
            private logger = new Logger(LoggingInterceptor.name);
    constructor(private readonly requestService : RequestService) {}
    intercept(context: ExecutionContext, next: CallHandler<any>)
    : Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || 'Unknown';
        const { ip , method , path: url  } = request;
       
        this.logger.log(`Request... ${method} 
            ${url} ${userAgent} ${ip}: ${context.getClass().name}
             ${context.getHandler().name} invoked ... `);
        this.logger.debug(this.requestService.getUserID())     

        const now = Date.now(); 
        return next.handle().pipe(
            tap((res) => {
               const response= context.switchToHttp().getResponse();
               const { statusCode } = response;
               const contentlength = response.get('content-length');
               this.logger.log(`Response... ${method}
                ${url} ${statusCode} ${contentlength} - ${userAgent}
                ${ip} `);
                this.logger.log(`Response time: ${Date.now() - now}ms`);
                this.logger.debug("RESPONSE BODY: ", res);
    



               }           )
        );
    }
}

