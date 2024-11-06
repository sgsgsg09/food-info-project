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
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별 ("male" 또는 "female")', example: 'male', enum: ['male', 'female'] }),
    __metadata("design:type", String)
], UserDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '키 (cm 단위)', example: 170 }),
    __metadata("design:type", Number)
], UserDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '몸무게 (kg 단위)', example: 70 }),
    __metadata("design:type", Number)
], UserDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '체지방률 (%) (선택 입력)',
        example: 15,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "bodyFatPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '나이', example: 25 }),
    __metadata("design:type", Number)
], UserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '활동 수준 (1.2: 아주 낮음 ~ 1.9: 매우 높음)',
        example: 1.55,
        minimum: 1.2,
        maximum: 1.9,
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "activityLevel", void 0);
//# sourceMappingURL=user.dto.js.map