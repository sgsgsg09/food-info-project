import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { FoodDto } from '../dto/food.dto';
import { ConfigService } from '@nestjs/config';

const csv = require('csv-parser'); // CommonJS 방식으로 csv-parser 불러오기

@Injectable()
export class CsvParser {
  private readonly filePath: string;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.filePath = this.configService.get<string>('CSV_FILE_PATH') || path.join(__dirname, '../../FoodNutritionData.csv');
    
    // 파일 경로가 설정되지 않은 경우 예외 발생
    if (!this.filePath) {
      throw new Error('CSV file path is not configured.');
    }
  }

  // CSV 파일을 파싱하여 주요 필드만 반환하는 메서드
  async parseFoodData(): Promise<FoodDto[]> {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found at path: ${this.filePath}`);
    }

    const results: FoodDto[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => {
          try {
            results.push(this.mapToFoodDto(data));
          } catch (error) {
            reject(new Error(`Error parsing data row: ${error.message}`));
          }
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(new Error(`Error reading CSV: ${error.message}`)));
    });
  }

  // 특정 음식 이름이 포함된 데이터를 검색하는 메서드
  async searchFoodByName(name: string): Promise<FoodDto[]> {
    const lowerCasedName = name.trim().toLowerCase();
    const results: FoodDto[] = [];

    if (!fs.existsSync(this.filePath)) {
      throw new Error(`File not found at path: ${this.filePath}`);
    }

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => {
          const foodData = this.mapToFoodDto(data);
          
          // 부분 일치 검색을 위해 includes 사용
          if (foodData.name.toLowerCase().includes(lowerCasedName)) {
            results.push(foodData);
          }
        })
        .on('end', () => resolve(results)) // 모든 일치 항목을 배열로 반환
        .on('error', (error) => reject(new Error(`Error searching for food: ${error.message}`)));
    });
  }

  // CSV 데이터를 FoodDto 형식에 맞게 매핑하는 함수
  private mapToFoodDto(data: any): FoodDto {
    return {
      name: data['식품명'] || data['name'],
      calories: this.parseNumber(data['에너지(kcal)'] || data['칼로리']),
      protein: this.parseNumber(data['단백질(g)'] || data['protein']),
      fat: this.parseNumber(data['지방(g)'] || data['fat']),
      carbs: this.parseNumber(data['탄수화물(g)'] || data['carbs']),
      fiber: this.parseNumber(data['총 식이섬유(g)'] || data['fiber']),
    };
  }

  // 숫자 값을 파싱하는 함수, NaN일 경우 0 반환
  private parseNumber(value: string | undefined): number {
    const parsed = parseFloat(value || '0');
    return isNaN(parsed) ? 0 : parsed;
  }
}