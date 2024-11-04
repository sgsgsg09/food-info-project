"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParser = void 0;
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
class CsvParser {
    constructor(filePath) {
        this.filePath = filePath || path.join(__dirname, '../../FoodNutritionData.csv');
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`CSV file not found at path: ${this.filePath}`);
        }
    }
    async parseFoodData() {
        const results = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                try {
                    results.push(this.mapToFoodDto(data));
                }
                catch (error) {
                    reject(new Error(`Error parsing row: ${error.message}`));
                }
            })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(new Error(`Error reading CSV: ${error.message}`)));
        });
    }
    async searchFoodByName(name) {
        const results = [];
        const searchName = name.trim().toLowerCase();
        return new Promise((resolve, reject) => {
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (data) => {
                const foodData = this.mapToFoodDto(data);
                if (foodData.name.toLowerCase().includes(searchName)) {
                    results.push(foodData);
                }
            })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(new Error(`Error searching CSV: ${error.message}`)));
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
}
exports.CsvParser = CsvParser;
//# sourceMappingURL=csv-parser.js.map