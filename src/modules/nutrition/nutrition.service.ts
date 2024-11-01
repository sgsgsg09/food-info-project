import { Injectable } from '@nestjs/common';
import { FoodDto } from '../../dto/food.dto';
import { UserDto } from '../../dto/user.dto';
import { UserDailyNeedsDto } from '../../dto/user-daily-needs.dto';
import { NutritionComparisonResultDto } from '../../dto/nutrition-comparison-result.dto';

@Injectable()
export class NutritionService {
  // 사용자 신체 정보를 바탕으로 일일 필요 영양 성분 계산
  calculateUserDailyNeeds(user: UserDto): UserDailyNeedsDto {
    const baseCalories = 10 * user.weight + 6.25 * user.height - 5 * user.age;
    const activityMultiplier = this.getActivityMultiplier(user.activityLevel);

    const calories = baseCalories * activityMultiplier;
    const protein = user.weight * 1.2; // 예시: 단백질 g 기준 체중 1.2배
    const fat = calories * 0.25 / 9; // 예시: 총 칼로리의 25%를 지방으로
    const carbs = (calories - protein * 4 - fat * 9) / 4;
    const fiber = 30; // 권장 식이섬유 (임의 값)

    return { calories, protein, fat, carbs, fiber };
  }

  // 음식 정보와 사용자의 필요 영양 성분을 비교
  compareWithUserNeeds(food: FoodDto, userNeeds: UserDailyNeedsDto): NutritionComparisonResultDto {
    return {
      caloriesDifference: food.calories - userNeeds.calories,
      proteinDifference: food.protein - userNeeds.protein,
      fatDifference: food.fat - userNeeds.fat,
      carbsDifference: food.carbs - userNeeds.carbs,
      fiberDifference: food.fiber - userNeeds.fiber,
    };
  }

  // 활동 수준에 따라 필요 칼로리 계산을 위한 multiplier
  private getActivityMultiplier(level: number): number {
    const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9]; // 예시: 활동 수준별 계수
    return multipliers[level - 1] || 1.2;
  }
}