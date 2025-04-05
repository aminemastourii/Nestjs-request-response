import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guards';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
import { FreezePipe } from './pipes/freeze.pipe';

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

  @Post()
  @UseGuards(FreezePipe)
  postexemple(@Body() body: any) {
    body.test = "heeey , this is a test";
  }
}
