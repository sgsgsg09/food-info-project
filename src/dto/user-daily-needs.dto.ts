import { ApiProperty } from '@nestjs/swagger';

export class UserDailyNeedsDto {
  @ApiProperty({ description: '필요 칼로리' })
  calories: number;

  @ApiProperty({ description: '필요 단백질(g)' })
  protein: number;

  @ApiProperty({ description: '필요 지방(g)' })
  fat: number;

  @ApiProperty({ description: '필요 탄수화물(g)' })
  carbs: number;

  @ApiProperty({ description: '필요 식이섬유(g)' })
  fiber: number;
}