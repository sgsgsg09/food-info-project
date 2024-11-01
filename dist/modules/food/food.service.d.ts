import { FoodDto } from '../../dto/food.dto';
import { FoodRepository } from './food.repository';
export declare class FoodService {
    private readonly foodRepository;
    constructor(foodRepository: FoodRepository);
    getAllFoodData(): Promise<FoodDto[]>;
    getFoodInfo(name: string): Promise<FoodDto[]>;
}
