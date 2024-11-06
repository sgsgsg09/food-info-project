// src/controllers/user.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NutritionService } from '../modules/nutrition/nutrition.service';
import { UserDto } from '../dto/user.dto';
import { UserDailyNeedsDto } from '../dto/user-daily-needs.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post('calculate-needs')
  @ApiOperation({ summary: '사용자의 일일 필요 영양소 계산' })
  @ApiResponse({ status: 200, description: '사용자의 일일 필요 영양소 반환', type: UserDailyNeedsDto })
  async calculateUserNeeds(@Body() userDto: UserDto): Promise<UserDailyNeedsDto> {
    // 유효성 검사
    if (!userDto.gender || !userDto.height || !userDto.weight || !userDto.age || !userDto.activityLevel) {
      throw new BadRequestException('필수 사용자 정보가 누락되었습니다.');
    }

    // NutritionService에서 사용자 일일 필요 영양 성분을 계산
    return this.nutritionService.calculateUserDailyNeeds(userDto);
  }
}