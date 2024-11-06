import { UserDto } from '../../dto/user.dto';
import { FoodDto } from '../../dto/food.dto';
import { UserDailyNeedsDto } from '../../dto/user-daily-needs.dto';
export declare class NutritionService {
    calculateMealPortion(userNeeds: UserDailyNeedsDto): Partial<UserDailyNeedsDto>;
    analyzeFoodForUser(food: FoodDto, userNeeds: UserDailyNeedsDto): {
        isSuitable: boolean;
        name: string;
        calories: number;
        protein: number;
        fat: number;
        carbs: number;
        fiber: number;
    };
    calculateUserDailyNeeds(user: UserDto): UserDailyNeedsDto;
    compareWithUserNeeds(food: FoodDto, userNeeds: UserDailyNeedsDto): {
        foodName: string;
        isSuitable: boolean;
        details: {
            calories: number;
            protein: {
                amount: number;
                diff: number;
            };
            fat: {
                amount: number;
                diff: number;
            };
            carbs: {
                amount: number;
                diff: number;
            };
            fiber: {
                amount: number;
                diff: number;
            };
        };
    };
}
