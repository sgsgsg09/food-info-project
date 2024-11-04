import { FoodDto } from '../dto/food.dto';
export declare class CsvParser {
    private readonly filePath;
    constructor(filePath?: string);
    parseFoodData(): Promise<FoodDto[]>;
    searchFoodByName(name: string): Promise<FoodDto[]>;
    private mapToFoodDto;
    private parseNumber;
}
