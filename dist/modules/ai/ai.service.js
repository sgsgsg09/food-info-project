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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const config_1 = require("@nestjs/config");
let AiService = class AiService {
    constructor(configService) {
        this.configService = configService;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('OPENAI_API_KEY'),
        });
    }
    async analyzeImageFromBuffer(buffer) {
        try {
            const base64Image = buffer.toString('base64');
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: '한국어로 유사한 음식 이름만 제공합니다.' },
                    {
                        role: 'user',
                        content: `다음 음식의 이름을 알려주세요.`,
                    },
                ],
                temperature: 0.5,
            });
            return response.choices[0]?.message?.content || '결과를 가져올 수 없습니다';
        }
        catch (error) {
            console.error('Error analyzing image:', error);
            throw new Error('이미지 분석 중 문제가 발생했습니다.');
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map