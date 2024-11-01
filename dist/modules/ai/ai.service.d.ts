import { ConfigService } from '@nestjs/config';
export declare class AiService {
    private configService;
    private openai;
    constructor(configService: ConfigService);
    analyzeImageFromBuffer(buffer: Buffer): Promise<string>;
}
