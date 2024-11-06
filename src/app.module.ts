import { Module } from '@nestjs/common';
import { FoodModule } from './modules/food/food.module';
import { AiModule } from './modules/ai/ai.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { UserController } from './controllers/user.controller';
import { FoodController } from './controllers/food.controller';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './controllers/ai.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수 설정
    FoodModule,
    AiModule,
    NutritionModule,
  ],
  controllers: [UserController, FoodController, AiController],
})
export class AppModule {}