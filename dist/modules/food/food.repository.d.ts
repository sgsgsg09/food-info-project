import { CsvParser } from '../../utils/csv-parser';
import { FoodDto } from '../../dto/food.dto';
export declare class FoodRepository {
    private readonly csvParser;
    constructor(csvParser: CsvParser);
    findAll(): Promise<FoodDto[]>;
    findByName(name: string): Promise<FoodDto[]>;
}
