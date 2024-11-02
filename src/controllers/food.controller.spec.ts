import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from '../controllers/food.controller';
import { FoodService } from '../modules/food/food.service';
import { FoodDto } from '../dto/food.dto';
import { NotFoundException } from '@nestjs/common';

describe('FoodController', () => {
  let controller: FoodController;
  let foodService: FoodService;

  const mockFoodData: FoodDto[] = [
    { name: '김밥', calories: 200, protein: 6, fat: 2, carbs: 30, fiber: 1 },
  ];

  const mockFoodService = {
    getFoodInfo: jest.fn((name: string) => {
      return Promise.resolve(mockFoodData.filter(food => food.name === name));
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [{ provide: FoodService, useValue: mockFoodService }],
    }).compile();

    controller = module.get<FoodController>(FoodController);
    foodService = module.get<FoodService>(FoodService);
  });

  it('should return food data for a given food name', async () => {
    const foodName = '김밥';
    const result = await controller.getFoodInfo(foodName);
    
    expect(result).toEqual(mockFoodData);
    expect(foodService.getFoodInfo).toHaveBeenCalledWith(foodName);
  });

  it('should throw NotFoundException if food is not found', async () => {
    const foodName = '없는 음식';
    mockFoodService.getFoodInfo.mockResolvedValue([]);
    
    await expect(controller.getFoodInfo(foodName)).rejects.toThrow(NotFoundException);
  });
});