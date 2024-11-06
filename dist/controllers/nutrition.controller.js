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
exports.NutritionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nutrition_service_1 = require("../modules/nutrition/nutrition.service");
const user_daily_needs_dto_1 = require("../dto/user-daily-needs.dto");
let NutritionController = class NutritionController {
    constructor(nutritionService) {
        this.nutritionService = nutritionService;
    }
    calculateMealPortion(userNeeds) {
        return this.nutritionService.calculateMealPortion(userNeeds);
    }
};
exports.NutritionController = NutritionController;
__decorate([
    (0, common_1.Post)('meal-portion'),
    (0, swagger_1.ApiOperation)({ summary: '사용자의 일일 필요 영양 성분에 따른 한 끼 섭취량 계산' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '한 끼 섭취량 반환' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_daily_needs_dto_1.UserDailyNeedsDto]),
    __metadata("design:returntype", void 0)
], NutritionController.prototype, "calculateMealPortion", null);
exports.NutritionController = NutritionController = __decorate([
    (0, swagger_1.ApiTags)('Nutrition'),
    (0, common_1.Controller)('nutrition'),
    __metadata("design:paramtypes", [nutrition_service_1.NutritionService])
], NutritionController);
//# sourceMappingURL=nutrition.controller.js.map