// src/config/openai.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiConfig {
  constructor(private configService: ConfigService) {}

  getApiKey(): string {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key is missing. Please set OPENAI_API_KEY in environment variables.');
    }
    return apiKey;
  }
}