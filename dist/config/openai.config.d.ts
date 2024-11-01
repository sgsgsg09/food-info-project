import { ConfigService } from '@nestjs/config';
export declare class OpenAiConfig {
    private configService;
    readonly apiKey: string;
    constructor(configService: ConfigService);
}
