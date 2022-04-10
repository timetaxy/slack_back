import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@ApiTags('USER')
@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: '정보조회' })
  // getUsers(@Req() req) {
  // return req.user;
  @Get()
  getUsers(@User() user) {
    return user;
  }
  @ApiOperation({ summary: '회원가입' })
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
    return;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  // logIn(@Req() req) {
  // return req.user;
  logIn(@User() user) {
    return user;
  }

  //req,res 안 넣을 수 있다면 코드상 더 좋다, 서비스에서는 더 그렇다
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
