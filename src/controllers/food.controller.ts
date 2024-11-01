import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FoodService } from '../modules/food/food.service';
import { FoodDto } from '../dto/food.dto';

@ApiTags('Food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('info')
  @ApiOperation({ summary: '음식 이름으로 음식 정보 조회' })
  @ApiResponse({ status: 200, description: '음식 정보 반환', type: FoodDto, isArray: true })
  @ApiResponse({ status: 404, description: '음식 정보를 찾을 수 없습니다.' })
  async getFoodInfo(@Query('name') name: string): Promise<FoodDto[]> {
    console.log(`Received search name: ${name}`);
    
    // name 유효성 검사 추가
    if (!name || name.trim() === '') {
      throw new NotFoundException('검색어를 입력해 주세요.');
    }

    const foodInfo = await this.foodService.getFoodInfo(name);

    // 검색 결과가 없으면 예외 발생
    if (!foodInfo || foodInfo.length === 0) {
      throw new NotFoundException('해당 음식 정보를 찾을 수 없습니다.');
    }

    return foodInfo;
  }
}