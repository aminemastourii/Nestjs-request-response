import { Body, Controller, Get, InternalServerErrorException, Post, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guards';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
import { FreezePipe } from './pipes/freeze.pipe';
import { HttpExceptionFilter } from './filters/http-exception.filter';

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

  @Get('httperror')
  @UseFilters(HttpExceptionFilter)
  getHttpError() {
    throw new InternalServerErrorException();
  }




}
