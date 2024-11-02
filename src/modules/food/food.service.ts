import { Injectable } from '@nestjs/common';
import { FoodDto } from '../../dto/food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getAllFoodData(): Promise<FoodDto[]> {
    return await this.foodRepository.findAll();
  }

// FoodService
async getFoodInfo(name: string): Promise<FoodDto[]> {
  const foodInfo = await this.foodRepository.findByName(name);
  console.log(`FoodService found food info: ${JSON.stringify(foodInfo)}`);
  return foodInfo;
}
}