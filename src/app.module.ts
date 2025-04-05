import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { AuthGuard } from './guards/auth.guards';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptors';
import { FreezePipe } from './pipes/freeze.pipe';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService,{
    provide: APP_GUARD, // provide our guard  globally
    useClass: AuthGuard,
  }, 
  {
    provide: APP_INTERCEPTOR, // privide our interceptor globally
    scope: Scope.REQUEST, // scope of the interceptor is a request because we are injecting a request service
                          // which is a request scoped
    useClass: LoggingInterceptor,
},
{
  provide: APP_PIPE, // privde our  freeze filter globally 
  useClass: FreezePipe,
}
],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('*');
  }
}
