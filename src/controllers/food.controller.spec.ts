import { Test, TestingModule } from '@nestjs/testing';
import { FoodController } from './food.controller';
import { FoodService } from '../modules/food/food.service';
import { NotFoundException } from '@nestjs/common';

describe('FoodController', () => {
  let foodController: FoodController;
  let foodService: FoodService;

  const mockFoodService = {
    getFoodInfo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodController],
      providers: [
        { provide: FoodService, useValue: mockFoodService },
      ],
    }).compile();

    foodController = module.get<FoodController>(FoodController);
    foodService = module.get<FoodService>(FoodService);
  });

  it('should return message if food not found', async () => {
    // 음식 정보가 없을 때 null을 반환하도록 모킹
    mockFoodService.getFoodInfo.mockResolvedValueOnce(null);

    await expect(foodController.getFoodInfo('없는 음식')).rejects.toThrow(NotFoundException);
  });
});