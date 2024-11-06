import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '성별 ("male" 또는 "female")', example: 'male', enum: ['male', 'female'] })
  gender: 'male' | 'female'; // 성별을 enum으로 정의

  @ApiProperty({ description: '키 (cm 단위)', example: 170 })
  height: number;

  @ApiProperty({ description: '몸무게 (kg 단위)', example: 70 })
  weight: number;

  @ApiPropertyOptional({
    description: '체지방률 (%) (선택 입력)',
    example: 15,
  })
  bodyFatPercentage?: number; // 선택 입력 필드로 설정

  @ApiProperty({ description: '나이', example: 25 })
  age: number;

  @ApiProperty({
    description: '활동 수준 (1.2: 아주 낮음 ~ 1.9: 매우 높음)',
    example: 1.55,
    minimum: 1.2,
    maximum: 1.9,
  })
  activityLevel: number;
}