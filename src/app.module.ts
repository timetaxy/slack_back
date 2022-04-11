import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
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
    AuthModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    //설정을 외부에서 가져올 때는 비동기적 로딩
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [],
        };
      },
    }),
    EventsModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   // entities: ['entities/*.js'],
    //   // entities: [ChannelChats],
    //   autoLoadEntities: true,
    //   synchronize: false,
    // }),
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
