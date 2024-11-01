import * as fs from 'fs';
import * as path from 'path';
const csv = require('csv-parser'); // CommonJS 방식으로 import

interface CsvData {
  [key: string]: string;
}

interface FoodDto {
  name: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

function readCsvFile(filePath: string): Promise<CsvData[]> {
  return new Promise((resolve, reject) => {
    const results: CsvData[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// CSV 데이터를 FoodDto 형식에 맞게 매핑하는 함수
function mapToFoodDto(data: CsvData): FoodDto {
  return {
    name: data['식품명'] || data['name'],
    calories: parseNumber(data['에너지(㎉)'] || data['칼로리']),
    protein: parseNumber(data['단백질(g)'] || data['protein']),
    fat: parseNumber(data['지방(g)'] || data['fat']),
    carbs: parseNumber(data['탄수화물(g)'] || data['carbs']),
    fiber: parseNumber(data['총 식이섬유(g)'] || data['fiber']),
  };
}

// 문자열 값을 숫자로 변환하는 함수
function parseNumber(value: string | undefined): number {
  const parsed = parseFloat(value || '0');
  return isNaN(parsed) ? 0 : parsed;
}

// 김밥에 대한 영양 성분만 추출하는 함수
async function extractNutritionForGimbap(filePath: string) {
  try {
    const data = await readCsvFile(filePath);
    const gimbapData = data.find((item) => item['식품명'] === '김밥');

    if (gimbapData) {
      const gimbapNutrition = mapToFoodDto(gimbapData);
      console.log('김밥의 영양 성분:', gimbapNutrition);
    } else {
      console.log('김밥에 대한 데이터가 없습니다.');
    }
  } catch (error) {
    console.error('파일을 읽는 중 오류가 발생했습니다:', error);
  }
}

// 파일 경로를 절대 경로나 상대 경로로 정확히 지정
const csvFilePath = path.join(__dirname, '../FoodNutritionData.csv'); // 적절히 수정

// 김밥 영양 성분 추출 함수 호출
extractNutritionForGimbap(csvFilePath);