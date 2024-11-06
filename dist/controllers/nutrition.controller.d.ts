import { NutritionService } from '../modules/nutrition/nutrition.service';
import { UserDailyNeedsDto } from '../dto/user-daily-needs.dto';
export declare class NutritionController {
    private readonly nutritionService;
    constructor(nutritionService: NutritionService);
    calculateMealPortion(userNeeds: UserDailyNeedsDto): Partial<UserDailyNeedsDto>;
}
