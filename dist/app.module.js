"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const food_module_1 = require("./modules/food/food.module");
const ai_module_1 = require("./modules/ai/ai.module");
const nutrition_module_1 = require("./modules/nutrition/nutrition.module");
const user_controller_1 = require("./controllers/user.controller");
const food_controller_1 = require("./controllers/food.controller");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            food_module_1.FoodModule,
            ai_module_1.AiModule,
            nutrition_module_1.NutritionModule,
        ],
        controllers: [user_controller_1.UserController, food_controller_1.FoodController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map