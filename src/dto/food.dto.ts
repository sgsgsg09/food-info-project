import { ApiProperty } from '@nestjs/swagger';

export class FoodDto {
  @ApiProperty({ description: '식품명' })
  name: string;

  @ApiProperty({ description: '에너지(kcal)', example: 100 })
  calories: number;

  @ApiProperty({ description: '단백질(g)', example: 6 })
  protein: number;

  @ApiProperty({ description: '지방(g)', example: 5 })
  fat: number;

  @ApiProperty({ description: '탄수화물(g)', example: 20 })
  carbs: number;

  @ApiProperty({ description: '식이섬유(g)', example: 3 })
  fiber: number;
}