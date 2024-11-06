// src/utils/csv-parser.ts

import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { FoodDto } from '../dto/food.dto';


export class CsvParser {
  private readonly filePath: string;

  constructor(filePath?: string) {
    // 기본 CSV 파일 경로 설정
    this.filePath = filePath || path.join(__dirname, '../../FoodNutritionData.csv');

    // 파일이 존재하지 않으면 에러 발생
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`CSV file not found at path: ${this.filePath}`);
    }
  }

  // CSV 파일을 파싱하여 모든 음식 데이터를 반환
  async parseFoodData(): Promise<FoodDto[]> {
    const results: FoodDto[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath, { encoding: 'utf-8' })
      .pipe(csv())
        .on('data', (data) => {
          try {
            results.push(this.mapToFoodDto(data));
          } catch (error) {
            reject(new Error(`Error parsing row: ${error.message}`));
          }
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(new Error(`Error reading CSV: ${error.message}`)));
    });
  }

  // 특정 음식 이름을 검색하여 해당 데이터를 반환
  async searchFoodByName(name: string): Promise<FoodDto[]> {
    const results: FoodDto[] = [];
    const searchName = decodeURIComponent(name.trim().toLowerCase());
    // 인코딩된 문자열이 들어오면.

    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => {
          const foodData = this.mapToFoodDto(data);
          if (foodData.name.toLowerCase().includes(searchName)) {
            results.push(foodData);
          }
        })
        .on('end', () => resolve(results))
        .on('error', (error) => reject(new Error(`Error searching CSV: ${error.message}`)));
    });
  }

  // CSV 데이터를 FoodDto 형식으로 매핑
  private mapToFoodDto(data: any): FoodDto {
    return {
      name: data['식품명'] || data['name'],
      calories: this.parseNumber(data['에너지(kcal)'] || data['칼로리']),
      protein: this.parseNumber(data['단백질(g)'] || data['protein']),
      fat: this.parseNumber(data['지방(g)'] || data['fat']),
      carbs: this.parseNumber(data['탄수화물(g)'] || data['carbs']),
      fiber: this.parseNumber(data['식이섬유(g)'] || data['fiber']),
    };
  }

  // NaN 값을 0으로 처리하는 숫자 파싱 함수
  private parseNumber(value: string | undefined): number {
    const parsed = parseFloat(value || '0');
    return isNaN(parsed) ? 0 : parsed;
  }
}