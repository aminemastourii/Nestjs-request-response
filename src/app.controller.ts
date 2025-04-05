import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guards';
import { LoggingInterceptor } from './interceptors/logging.interceptors';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //@UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('user')
  getUserID(): string {
    return this.appService.getUserID();
  }
  
}
