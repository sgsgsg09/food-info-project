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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionComparisonResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class NutritionComparisonResultDto {
}
exports.NutritionComparisonResultDto = NutritionComparisonResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '칼로리 차이', example: -50 }),
    __metadata("design:type", Number)
], NutritionComparisonResultDto.prototype, "caloriesDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '단백질(g) 차이', example: 5 }),
    __metadata("design:type", Number)
], NutritionComparisonResultDto.prototype, "proteinDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '지방(g) 차이', example: -3 }),
    __metadata("design:type", Number)
], NutritionComparisonResultDto.prototype, "fatDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '탄수화물(g) 차이', example: 15 }),
    __metadata("design:type", Number)
], NutritionComparisonResultDto.prototype, "carbsDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '식이섬유(g) 차이', example: 2 }),
    __metadata("design:type", Number)
], NutritionComparisonResultDto.prototype, "fiberDifference", void 0);
//# sourceMappingURL=nutrition-comparison-result.dto.js.map