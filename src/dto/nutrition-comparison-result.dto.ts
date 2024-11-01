import { ApiProperty } from '@nestjs/swagger';

export class NutritionComparisonResultDto {
  @ApiProperty({ description: '칼로리 차이', example: -50 })
  caloriesDifference: number;

  @ApiProperty({ description: '단백질(g) 차이', example: 5 })
  proteinDifference: number;

  @ApiProperty({ description: '지방(g) 차이', example: -3 })
  fatDifference: number;

  @ApiProperty({ description: '탄수화물(g) 차이', example: 15 })
  carbsDifference: number;

  @ApiProperty({ description: '식이섬유(g) 차이', example: 2 })
  fiberDifference: number;
}