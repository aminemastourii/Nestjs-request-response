import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { AuthGuard } from './guards/auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RequestService,{
    provide: APP_GUARD, // provide our guard  globally
    useClass: AuthGuard,
  },],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('*');
  }
}
