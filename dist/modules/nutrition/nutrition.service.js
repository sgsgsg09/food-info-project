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
    calculateMealPortion(userNeeds) {
        const mealPortion = {
            calories: userNeeds.calories / 3,
            protein: userNeeds.protein / 3,
            fat: userNeeds.fat / 3,
            carbs: userNeeds.carbs / 3,
            fiber: userNeeds.fiber / 3,
        };
        return mealPortion;
    }
    analyzeFoodForUser(food, userNeeds) {
        const mealPortion = this.calculateMealPortion(userNeeds);
        return {
            ...food,
            isSuitable: food.calories <= mealPortion.calories,
        };
    }
    calculateUserDailyNeeds(user) {
        let bmr;
        if (user.bodyFatPercentage !== undefined) {
            const leanBodyMass = user.weight * (1 - user.bodyFatPercentage / 100);
            bmr = 370 + (21.6 * leanBodyMass);
        }
        else {
            bmr = user.gender === 'male'
                ? 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age)
                : 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
        }
        const tdee = bmr * (user.activityLevel || 1.2);
        const proteinCalories = tdee * 0.15;
        const fatCalories = tdee * 0.25;
        const carbCalories = tdee * 0.6;
        return {
            calories: tdee,
            protein: proteinCalories / 4,
            fat: fatCalories / 9,
            carbs: carbCalories / 4,
            fiber: user.age > 50
                ? (user.gender === 'male' ? 30 : 21)
                : (user.gender === 'male' ? 38 : 25),
        };
    }
    compareWithUserNeeds(food, userNeeds) {
        const proteinDiff = food.protein - userNeeds.protein;
        const fatDiff = food.fat - userNeeds.fat;
        const carbsDiff = food.carbs - userNeeds.carbs;
        const fiberDiff = food.fiber - userNeeds.fiber;
        return {
            foodName: food.name,
            isSuitable: proteinDiff >= 0 && fatDiff >= 0 && carbsDiff >= 0 && fiberDiff >= 0,
            details: {
                calories: food.calories,
                protein: { amount: food.protein, diff: proteinDiff },
                fat: { amount: food.fat, diff: fatDiff },
                carbs: { amount: food.carbs, diff: carbsDiff },
                fiber: { amount: food.fiber, diff: fiberDiff },
            },
        };
    }
};
exports.NutritionService = NutritionService;
exports.NutritionService = NutritionService = __decorate([
    (0, common_1.Injectable)()
], NutritionService);
//# sourceMappingURL=nutrition.service.js.map