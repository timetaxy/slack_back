import { ApiQuery } from '@nestjs/swagger';

export class UserDto {
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '가녀올 건 수',
  })
  id: number;
}
