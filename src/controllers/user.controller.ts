import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { NutritionService } from '../modules/nutrition/nutrition.service';
import { FoodService } from '../modules/food/food.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly foodService: FoodService,
    private readonly nutritionService: NutritionService,
  ) {}

  @Post('analyze')
  async analyzeFood(@Body() body: { foodName: string; user?: UserDto }) {
    const { foodName, user } = body;

    // 음식 정보 조회 (배열 형태로 여러 결과가 반환될 수 있음)
    const foodInfo = await this.foodService.getFoodInfo(foodName);
    if (!foodInfo || foodInfo.length === 0) {
      throw new NotFoundException('해당 음식 정보를 찾을 수 없습니다.');
    }

    // 신체 정보가 없으면 음식 정보만 반환
    if (!user) {
      return { foodInfo };
    }

    // 신체 정보가 있을 경우, 각 음식에 대해 맞춤형 영양 분석 수행
    const userNeeds = this.nutritionService.calculateUserDailyNeeds(user);
    const nutritionComparison = foodInfo.map((food) =>
      this.nutritionService.compareWithUserNeeds(food, userNeeds),
    );

    return {
      foodInfo,
      nutritionComparison,
    };
  }
}