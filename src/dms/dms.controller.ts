import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { query } from 'express';

@Controller('api/workspaces/:workspace/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }
  // getChat(@Query('perPage') perPage, @Query('page') page) {
  //   console.log(query.perPage, query.page);
  // }

  @Post(':id/chats')
  postChat(@Body() body) {}
}
