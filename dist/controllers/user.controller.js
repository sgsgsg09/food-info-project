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
const swagger_1 = require("@nestjs/swagger");
const nutrition_service_1 = require("../modules/nutrition/nutrition.service");
const user_dto_1 = require("../dto/user.dto");
const user_daily_needs_dto_1 = require("../dto/user-daily-needs.dto");
let UserController = class UserController {
    constructor(nutritionService) {
        this.nutritionService = nutritionService;
    }
    async calculateUserNeeds(userDto) {
        if (!userDto.gender || !userDto.height || !userDto.weight || !userDto.age || !userDto.activityLevel) {
            throw new common_1.BadRequestException('필수 사용자 정보가 누락되었습니다.');
        }
        return this.nutritionService.calculateUserDailyNeeds(userDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('calculate-needs'),
    (0, swagger_1.ApiOperation)({ summary: '사용자의 일일 필요 영양소 계산' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '사용자의 일일 필요 영양소 반환', type: user_daily_needs_dto_1.UserDailyNeedsDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "calculateUserNeeds", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [nutrition_service_1.NutritionService])
], UserController);
//# sourceMappingURL=user.controller.js.map