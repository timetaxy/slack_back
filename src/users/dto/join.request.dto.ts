import { ApiProperty, PickType } from '@nestjs/swagger';

export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {
  // @ApiProperty({
  //   example: 'a.a.com',
  //   description: '메일',
  //   required: true,
  // })
  // public email: string;
  // @ApiProperty({
  //   example: 'name',
  //   description: '이름',
  //   required: true,
  // })
  // public nickname: string;
  // @ApiProperty({
  //   example: '!@ㅁㄴㅇㄹㅂㅈㄷㄱ!@',
  //   description: '비밀번호',
  //   required: true,
  // })
  // public password: string;
}
