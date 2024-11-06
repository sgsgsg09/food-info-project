// src/controllers/food.controller.ts
import { Controller, Get, Post, Query, Body, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FoodService } from '../modules/food/food.service';
import { NutritionService } from '../modules/nutrition/nutrition.service';
import { FoodDto } from '../dto/food.dto';

@ApiTags('Food')
@Controller('food')
export class FoodController {
  constructor(
    private readonly foodService: FoodService,
    private readonly nutritionService: NutritionService
  ) {}

  @Get('info')
  @ApiOperation({ summary: '음식 이름으로 음식 정보 조회' })
  @ApiResponse({ status: 200, description: '음식 정보 반환', type: FoodDto, isArray: true })
  @ApiResponse({ status: 404, description: '음식 정보를 찾을 수 없습니다.' })
  async getFoodInfo(@Query('name') name: string): Promise<FoodDto[]> {
    if (!name || name.trim() === '') {
      throw new NotFoundException('검색어를 입력해 주세요.');
    }
    const decodedName = decodeURIComponent(name); // 한글 디코딩
  const foodInfo = await this.foodService.getFoodInfo(decodedName);
    if (!foodInfo || foodInfo.length === 0) {
      throw new NotFoundException('해당 음식 정보를 찾을 수 없습니다.');
    }
    return foodInfo;
  }
}