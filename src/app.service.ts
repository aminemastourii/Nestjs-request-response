import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from './guards/auth.guards';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly request : RequestService
    ) {}


  getHello(): string {
    return 'Hello World!';
    
  }
  getUserID() {
   
    const  userID=this.request.getUserID();
    this.logger.log("this is the userID",userID);
    return " wow "
  }
}
