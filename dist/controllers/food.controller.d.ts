import { FoodService } from '../modules/food/food.service';
import { NutritionService } from '../modules/nutrition/nutrition.service';
import { FoodDto } from '../dto/food.dto';
export declare class FoodController {
    private readonly foodService;
    private readonly nutritionService;
    constructor(foodService: FoodService, nutritionService: NutritionService);
    getFoodInfo(name: string): Promise<FoodDto[]>;
}
