import { NutritionService } from '../modules/nutrition/nutrition.service';
import { FoodService } from '../modules/food/food.service';
import { UserDto } from '../dto/user.dto';
export declare class UserController {
    private readonly foodService;
    private readonly nutritionService;
    constructor(foodService: FoodService, nutritionService: NutritionService);
    analyzeFood(body: {
        foodName: string;
        user?: UserDto;
    }): Promise<{
        foodInfo: import("../dto/food.dto").FoodDto[];
        nutritionComparison?: undefined;
    } | {
        foodInfo: import("../dto/food.dto").FoodDto[];
        nutritionComparison: import("../dto/nutrition-comparison-result.dto").NutritionComparisonResultDto[];
    }>;
}
