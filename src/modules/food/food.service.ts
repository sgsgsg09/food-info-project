// src/modules/food/food.service.ts
import { Injectable } from '@nestjs/common';
import { FoodDto } from '../../dto/food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getFoodInfo(name: string, weight?: number): Promise<FoodDto[]> {
    // 음식 데이터 검색
    const foods = await this.foodRepository.findByName(name.trim().toLowerCase());
  
    // 영양소 계산
    return foods.map(food => {
      // 음식 데이터에 설정된 weight가 있으면 사용하고, 없으면 매개변수 weight를 기본값으로 사용
      const foodWeight = food.weight ?? weight ?? 100; // food.weight -> weight 매개변수 -> 기본값 100g 순으로 확인
  
      return this.calculateNutrientsByWeight(food, foodWeight);
    });
  }

  private calculateNutrientsByWeight(food: FoodDto, weight: number): FoodDto {
    const ratio = weight / 100 ;  // 기본값 100g 기준

    return {
      ...food,
      calories: Math.round(food.calories * ratio * 100) / 100, // 소수점 두 자리까지 반영
      protein: Math.round(food.protein * ratio * 100) / 100,
      fat: Math.round(food.fat * ratio * 100) / 100,
      carbs: Math.round(food.carbs * ratio * 100) / 100,
      fiber: Math.round(food.fiber * ratio * 100) / 100,
      weight: weight,
    };
  }
}