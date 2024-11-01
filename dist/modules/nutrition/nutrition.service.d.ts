import { FoodDto } from '../../dto/food.dto';
import { UserDto } from '../../dto/user.dto';
import { UserDailyNeedsDto } from '../../dto/user-daily-needs.dto';
import { NutritionComparisonResultDto } from '../../dto/nutrition-comparison-result.dto';
export declare class NutritionService {
    calculateUserDailyNeeds(user: UserDto): UserDailyNeedsDto;
    compareWithUserNeeds(food: FoodDto, userNeeds: UserDailyNeedsDto): NutritionComparisonResultDto;
    private getActivityMultiplier;
}
