import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      // map((data) => ({
      //   data,
      //   //리턴 형태 컨트롤 등
      //   code: 'SUCCESS',
      // })),
      map((data) => {
        data === undefined ? null : data;
      }),
      //json에 undeffned가 null과 같게 취급되지 않으므로. json은 undefined 모름.
      // 익셉션 필터가 더 좋다
    );

    // return next.handle().pipe(catchError) 에러처리 가능
    // new Error('error')
  }
}
