import { ApiQuery } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.request.dto';

export class UserDto extends JoinRequestDto {
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '가져올 건 수',
  })
  id: number;
}
