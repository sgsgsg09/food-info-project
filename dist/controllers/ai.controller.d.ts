import { AiService } from '../modules/ai/ai.service';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    analyzeImage(file: Express.Multer.File): Promise<string>;
}
