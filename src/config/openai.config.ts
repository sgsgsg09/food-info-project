import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiConfig {
  public readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!this.apiKey) {
      throw new Error('OpenAI API key is not set in environment variables');
    }
  }
}