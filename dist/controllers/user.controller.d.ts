import { NutritionService } from '../modules/nutrition/nutrition.service';
import { UserDto } from '../dto/user.dto';
import { UserDailyNeedsDto } from '../dto/user-daily-needs.dto';
export declare class UserController {
    private readonly nutritionService;
    constructor(nutritionService: NutritionService);
    calculateUserNeeds(userDto: UserDto): Promise<UserDailyNeedsDto>;
}
