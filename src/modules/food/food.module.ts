import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from '../../controllers/food.controller';
import { CsvParser } from '../../utils/csv-parser';
import { FoodRepository } from './food.repository';

@Module({
  providers: [FoodService, CsvParser, FoodRepository],
  exports: [FoodService],
})
export class FoodModule {}