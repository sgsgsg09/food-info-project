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
exports.OpenAiConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let OpenAiConfig = class OpenAiConfig {
    constructor(configService) {
        this.configService = configService;
        this.apiKey = this.configService.get('OPENAI_API_KEY');
        if (!this.apiKey) {
            throw new Error('OpenAI API key is not set in environment variables');
        }
    }
};
exports.OpenAiConfig = OpenAiConfig;
exports.OpenAiConfig = OpenAiConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAiConfig);
//# sourceMappingURL=openai.config.js.map