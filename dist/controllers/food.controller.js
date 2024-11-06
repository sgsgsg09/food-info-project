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
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const food_service_1 = require("../modules/food/food.service");
const nutrition_service_1 = require("../modules/nutrition/nutrition.service");
const food_dto_1 = require("../dto/food.dto");
let FoodController = class FoodController {
    constructor(foodService, nutritionService) {
        this.foodService = foodService;
        this.nutritionService = nutritionService;
    }
    async getFoodInfo(name) {
        if (!name || name.trim() === '') {
            throw new common_1.NotFoundException('검색어를 입력해 주세요.');
        }
        const foodInfo = await this.foodService.getFoodInfo(name);
        if (!foodInfo || foodInfo.length === 0) {
            throw new common_1.NotFoundException('해당 음식 정보를 찾을 수 없습니다.');
        }
        return foodInfo;
    }
};
exports.FoodController = FoodController;
__decorate([
    (0, common_1.Get)('info'),
    (0, swagger_1.ApiOperation)({ summary: '음식 이름으로 음식 정보 조회' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '음식 정보 반환', type: food_dto_1.FoodDto, isArray: true }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '음식 정보를 찾을 수 없습니다.' }),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getFoodInfo", null);
exports.FoodController = FoodController = __decorate([
    (0, swagger_1.ApiTags)('Food'),
    (0, common_1.Controller)('food'),
    __metadata("design:paramtypes", [food_service_1.FoodService,
        nutrition_service_1.NutritionService])
], FoodController);
//# sourceMappingURL=food.controller.js.map