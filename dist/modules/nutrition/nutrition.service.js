"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionService = void 0;
const common_1 = require("@nestjs/common");
let NutritionService = class NutritionService {
    calculateUserDailyNeeds(user) {
        const baseCalories = 10 * user.weight + 6.25 * user.height - 5 * user.age;
        const activityMultiplier = this.getActivityMultiplier(user.activityLevel);
        const calories = baseCalories * activityMultiplier;
        const protein = user.weight * 1.2;
        const fat = calories * 0.25 / 9;
        const carbs = (calories - protein * 4 - fat * 9) / 4;
        const fiber = 30;
        return { calories, protein, fat, carbs, fiber };
    }
    compareWithUserNeeds(food, userNeeds) {
        return {
            caloriesDifference: food.calories - userNeeds.calories,
            proteinDifference: food.protein - userNeeds.protein,
            fatDifference: food.fat - userNeeds.fat,
            carbsDifference: food.carbs - userNeeds.carbs,
            fiberDifference: food.fiber - userNeeds.fiber,
        };
    }
    getActivityMultiplier(level) {
        const multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
        return multipliers[level - 1] || 1.2;
    }
};
exports.NutritionService = NutritionService;
exports.NutritionService = NutritionService = __decorate([
    (0, common_1.Injectable)()
], NutritionService);
//# sourceMappingURL=nutrition.service.js.map