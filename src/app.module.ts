import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
const getEnv = async () => {
  //외부서버에서 키요청도 가능
  return {
    SECRET: 'secretFromFn',
  };
};
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [getEnv] }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  // providers: [
  //   {
  //     provide: AppService, > 사용시 @Inject('AppService') 주입 값의 키
  //     useClass: AppService,
  //     //원형
  //   },
  // ],
  //자바스크립트는 대부분은 힙에 저장, 스택에는 호출 컨텍스트
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // throw new Error('Method not implemented.');
  }
}
