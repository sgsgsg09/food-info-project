import { Test, TestingModule } from '@nestjs/testing';
import { CsvParser } from './csv-parser';
import { ConfigService } from '@nestjs/config';
import { FoodDto } from '../dto/food.dto';
import * as path from 'path';

describe('CsvParser', () => {
    let csvParser: CsvParser;
    let configService: ConfigService;
  
    // 테스트용 파일의 절대 경로
    const testCsvFilePath = path.resolve(__dirname, '../../test/test-food-data.csv');
    console.log(testCsvFilePath);
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CsvParser,
          {
            provide: ConfigService,
            useValue: {
              get: jest.fn().mockReturnValue(testCsvFilePath),
            },
          },
        ],
      }).compile();
  
      csvParser = module.get<CsvParser>(CsvParser);
    });
  

  it('should parse all food data from CSV file', async () => {
    const result = await csvParser.parseFoodData();

    const expectedData: FoodDto[] = [
      { name: '김밥', calories: 100, protein: 6, fat: 2, carbs: 30, fiber: 1 },
      { name: '라면', calories: 500, protein: 10, fat: 15, carbs: 60, fiber: 2 },
    ];

    expect(result).toEqual(expectedData);
  });

  it('should return food data for a given food name', async () => {
    const result = await csvParser.searchFoodByName('라면');

    const expectedData: FoodDto[] = [
      { name: '김밥', calories: 200, protein: 6, fat: 2, carbs: 30, fiber: 1 },
    ];

    expect(result).toEqual(expectedData);
  });

  it('should return an empty array if food name is not found', async () => {
    const result = await csvParser.searchFoodByName('없는 음식');
    expect(result).toEqual([]);
  });
});