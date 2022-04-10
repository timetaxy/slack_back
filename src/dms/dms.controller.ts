import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { query } from 'express';

@Controller('api/workspaces/:workspace/dms')
export class DmsController {
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '가녀올 건 수',
  })
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
