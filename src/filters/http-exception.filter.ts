import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable,Logger } from "@nestjs/common";

@Injectable()
@Catch( HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private  logger = new Logger(HttpExceptionFilter.name);
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus() ;
       this.logger.log(HttpExceptionFilter.name);
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(), 
            path: request.url, 
            error: "7aaaaachwa" 
        });

        
    }
  
}