"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const nutrition_service_1 = require("../modules/nutrition/nutrition.service");
const food_service_1 = require("../modules/food/food.service");
let UserController = class UserController {
    constructor(foodService, nutritionService) {
        this.foodService = foodService;
        this.nutritionService = nutritionService;
    }
    async analyzeFood(body) {
        const { foodName, user } = body;
        const foodInfo = await this.foodService.getFoodInfo(foodName);
        if (!foodInfo || foodInfo.length === 0) {
            throw new common_1.NotFoundException('해당 음식 정보를 찾을 수 없습니다.');
        }
        if (!user) {
            return { foodInfo };
        }
        const userNeeds = this.nutritionService.calculateUserDailyNeeds(user);
        const nutritionComparison = foodInfo.map((food) => this.nutritionService.compareWithUserNeeds(food, userNeeds));
        return {
            foodInfo,
            nutritionComparison,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('analyze'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "analyzeFood", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [food_service_1.FoodService,
        nutrition_service_1.NutritionService])
], UserController);
//# sourceMappingURL=user.controller.js.map