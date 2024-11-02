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
exports.CsvParser = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const config_1 = require("@nestjs/config");
const csv = require('csv-parser');
let CsvParser = class CsvParser {
    constructor(configService) {
        this.configService = configService;
        this.filePath = this.configService.get('CSV_FILE_PATH');
        if (!this.filePath) {
            throw new Error('CSV file path is not configured.');
        }
    }
    async parseFoodData() {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`File not found at path: ${this.filePath}`);
        }
        const results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                try {
                    results.push(this.mapToFoodDto(data));
                }
                catch (error) {
                    reject(new Error(`Error parsing data row: ${error.message}`));
                }
            })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(new Error(`Error reading CSV: ${error.message}`)));
        });
    }
    async searchFoodByName(name) {
        const lowerCasedName = name.trim().toLowerCase();
        const results = [];
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`File not found at path: ${this.filePath}`);
        }
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                const foodData = this.mapToFoodDto(data);
                if (foodData.name.toLowerCase().includes(lowerCasedName)) {
                    results.push(foodData);
                }
            })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(new Error(`Error searching for food: ${error.message}`)));
        });
    }
    mapToFoodDto(data) {
        return {
            name: data['식품명'] || data['name'],
            calories: this.parseNumber(data['에너지(kcal)'] || data['칼로리']),
            protein: this.parseNumber(data['단백질(g)'] || data['protein']),
            fat: this.parseNumber(data['지방(g)'] || data['fat']),
            carbs: this.parseNumber(data['탄수화물(g)'] || data['carbs']),
            fiber: this.parseNumber(data['식이섬유(g)'] || data['fiber']),
        };
    }
    parseNumber(value) {
        const parsed = parseFloat(value || '0');
        return isNaN(parsed) ? 0 : parsed;
    }
};
exports.CsvParser = CsvParser;
exports.CsvParser = CsvParser = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.ConfigService)),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CsvParser);
//# sourceMappingURL=csv-parser.js.map