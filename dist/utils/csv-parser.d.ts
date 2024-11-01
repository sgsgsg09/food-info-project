import { FoodDto } from '../dto/food.dto';
import { ConfigService } from '@nestjs/config';
export declare class CsvParser {
    private configService;
    private readonly filePath;
    constructor(configService: ConfigService);
    parseFoodData(): Promise<FoodDto[]>;
    searchFoodByName(name: string): Promise<FoodDto[]>;
    private mapToFoodDto;
    private parseNumber;
}
