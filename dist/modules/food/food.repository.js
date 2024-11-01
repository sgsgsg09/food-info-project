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
exports.FoodRepository = void 0;
const common_1 = require("@nestjs/common");
const csv_parser_1 = require("../../utils/csv-parser");
let FoodRepository = class FoodRepository {
    constructor(csvParser) {
        this.csvParser = csvParser;
    }
    async findAll() {
        return await this.csvParser.parseFoodData();
    }
    async findByName(name) {
        return await this.csvParser.searchFoodByName(name);
    }
};
exports.FoodRepository = FoodRepository;
exports.FoodRepository = FoodRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [csv_parser_1.CsvParser])
], FoodRepository);
//# sourceMappingURL=food.repository.js.map