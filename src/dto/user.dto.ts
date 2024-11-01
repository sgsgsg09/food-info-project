import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '키 (cm 단위)', example: 170 })
  height: number;

  @ApiProperty({ description: '몸무게 (kg 단위)', example: 70 })
  weight: number;

  @ApiProperty({ description: '체지방률 (%)', example: 15 })
  bodyFat: number;

  @ApiProperty({ description: '나이', example: 25 })
  age: number;

  @ApiProperty({
    description: '활동 수준 (1: 아주 낮음 ~ 5: 매우 높음)',
    example: 3,
    minimum: 1,
    maximum: 5,
  })
  activityLevel: number;
}