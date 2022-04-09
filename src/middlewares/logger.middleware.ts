import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

//모건 직접 구현시 경우 임, 실제로는 nest 모건을 대신 사용할 것
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    //req, next 다음 마지막 실행 됨. event on
    res.on('finish', () => {
      const { statusCode } = res;

      const contentLength = res.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} = ${userAgent} ${ip}`,
      );
    });
    // throw new Error('Method not implemented.');
    next();
  }
  private logger = new Logger('HTTP');
}
