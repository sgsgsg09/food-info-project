// src/modules/food/food.service.ts
import { Injectable } from '@nestjs/common';
import { FoodDto } from '../../dto/food.dto';
import { FoodRepository } from './food.repository';

@Injectable()
export class FoodService {
  constructor(private readonly foodRepository: FoodRepository) {}

  async getAllFoodData(): Promise<FoodDto[]> {
    return await this.foodRepository.findAll();
  }

  async getFoodInfo(name: string): Promise<FoodDto[]> {
    const processedName = name.trim().toLowerCase();
    return await this.foodRepository.findByName(processedName);
  }
}