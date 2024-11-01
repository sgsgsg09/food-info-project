import { Test, TestingModule } from '@nestjs/testing';
import { FoodService } from './food.service';
import { CsvParser } from '../../utils/csv-parser';
import { FoodRepository } from './food.repository';
import { FoodDto } from '../../dto/food.dto';

describe('FoodService', () => {
  let service: FoodService;
  let foodRepository: FoodRepository;

  // 테스트용 음식 데이터 생성
  const mockFoodData: FoodDto[] = [
    { name: '김밥', calories: 200, protein: 6, fat: 2, carbs: 30, fiber: 1 },
    { name: '라면', calories: 500, protein: 10, fat: 15, carbs: 60, fiber: 2 },
  ];

  // CsvParser의 mock 함수 설정
  const mockCsvParser = {
    parseFoodData: jest.fn().mockResolvedValue(mockFoodData),
    searchFoodByName: jest.fn((name: string) =>
      Promise.resolve(mockFoodData.find(food => food.name === name) || null),
    ),
  };

  // FoodRepository의 mock 함수 설정
  const mockFoodRepository = {
    findAll: jest.fn().mockResolvedValue(mockFoodData),
    findByName: jest.fn((name: string) =>
      Promise.resolve(mockFoodData.find(food => food.name === name) || null),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        { provide: FoodRepository, useValue: mockFoodRepository }, // FoodRepository 모킹 추가
        { provide: CsvParser, useValue: mockCsvParser },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    foodRepository = module.get<FoodRepository>(FoodRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all food data', async () => {
    const result = await service.getAllFoodData();
    expect(result).toEqual(mockFoodData);
    expect(foodRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return food data by name', async () => {
    const foodName = '김밥';
    const result = await service.getFoodInfo(foodName);
    expect(result).toEqual(mockFoodData[0]);
    expect(foodRepository.findByName).toHaveBeenCalledWith(foodName);
  });

  it('should return null if food not found', async () => {
    const foodName = '없는 음식';
    const result = await service.getFoodInfo(foodName);
    expect(result).toBeNull();
    expect(foodRepository.findByName).toHaveBeenCalledWith(foodName);
  });
});