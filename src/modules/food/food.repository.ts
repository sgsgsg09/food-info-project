import { Injectable } from '@nestjs/common';
import { CsvParser } from '../../utils/csv-parser';
import { FoodDto } from '../../dto/food.dto';

@Injectable()
export class FoodRepository {
  constructor(private readonly csvParser: CsvParser) {}

  async findAll(): Promise<FoodDto[]> {
    return await this.csvParser.parseFoodData();
  }

  async findByName(name: string): Promise<FoodDto[]> {
    return await this.csvParser.searchFoodByName(name);
  }
}