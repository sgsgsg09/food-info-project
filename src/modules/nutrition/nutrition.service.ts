// src/modules/nutrition/nutrition.service.ts
import { Injectable } from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';
import { FoodDto } from '../../dto/food.dto';
import { UserDailyNeedsDto } from '../../dto/user-daily-needs.dto';

@Injectable()
export class NutritionService {
  // 사용자의 일일 필요 영양 성분을 기준으로 한 끼 섭취량 계산
  calculateMealPortion(userNeeds: UserDailyNeedsDto): Partial<UserDailyNeedsDto> {
    // 한 끼는 일일 필요 영양 성분의 약 1/3로 가정
    const mealPortion = {
      calories: userNeeds.calories / 3,
      protein: userNeeds.protein / 3,
      fat: userNeeds.fat / 3,
      carbs: userNeeds.carbs / 3,
      fiber: userNeeds.fiber / 3,
    };
    return mealPortion;
  }

  // 음식 영양 정보가 사용자 필요 영양 성분에 적합한지 분석
  analyzeFoodForUser(food: FoodDto, userNeeds: UserDailyNeedsDto) {
    const mealPortion = this.calculateMealPortion(userNeeds);
    return {
      ...food,
      isSuitable: food.calories <= mealPortion.calories,
      // 추가 영양소 비교 로직 가능
    };
  }
    // 사용자의 일일 필요 영양 성분을 계산하는 메서드
  // 사용자 정보를 바탕으로 일일 필요 영양 성분 계산
  calculateUserDailyNeeds(user: UserDto): UserDailyNeedsDto {
    let bmr: number;

    // 체지방률이 제공된 경우 이를 이용한 BMR 계산 (Fat-Free Mass 기반)
    if (user.bodyFatPercentage !== undefined) {
      const leanBodyMass = user.weight * (1 - user.bodyFatPercentage / 100);
      bmr = 370 + (21.6 * leanBodyMass); // Fat-Free Mass 기반 BMR 계산
    } else {
      // 체지방률이 없을 경우 성별에 따른 기본 BMR 계산 사용
      bmr = user.gender === 'male'
        ? 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age)
        : 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
    }

    // 활동 수준을 반영한 총 필요 칼로리(TDEE) 계산
    const tdee = bmr * (user.activityLevel || 1.2);

    // 영양소 비율 설정 (총 칼로리 대비 비율)
    const proteinCalories = tdee * 0.15; // 단백질은 15%로 설정
    const fatCalories = tdee * 0.25;     // 지방은 25%
    const carbCalories = tdee * 0.6;     // 탄수화물은 60%

    return {
      calories: tdee,
      protein: proteinCalories / 4,  // 단백질 1g = 4 칼로리
      fat: fatCalories / 9,          // 지방 1g = 9 칼로리
      carbs: carbCalories / 4,       // 탄수화물 1g = 4 칼로리
      fiber: user.age > 50
        ? (user.gender === 'male' ? 30 : 21)  // 50세 이상 남성: 30g, 여성: 21g
        : (user.gender === 'male' ? 38 : 25), // 50세 미만 남성: 38g, 여성: 25g
    };
  }
  
    // 음식 정보와 사용자 필요 영양소를 비교하여 적합성 판단
    compareWithUserNeeds(food: FoodDto, userNeeds: UserDailyNeedsDto) {
      // 영양소 차이 계산
      const proteinDiff = food.protein - userNeeds.protein;
      const fatDiff = food.fat - userNeeds.fat;
      const carbsDiff = food.carbs - userNeeds.carbs;
      const fiberDiff = food.fiber - userNeeds.fiber;
  
      return {
        foodName: food.name,
        isSuitable: proteinDiff >= 0 && fatDiff >= 0 && carbsDiff >= 0 && fiberDiff >= 0,
        details: {
          calories: food.calories,
          protein: { amount: food.protein, diff: proteinDiff },
          fat: { amount: food.fat, diff: fatDiff },
          carbs: { amount: food.carbs, diff: carbsDiff },
          fiber: { amount: food.fiber, diff: fiberDiff },
        },
      };
    }
}