import { FoodService } from '../modules/food/food.service';
import { FoodDto } from '../dto/food.dto';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    getFoodInfo(name: string): Promise<FoodDto[]>;
}
