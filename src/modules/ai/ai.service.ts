// src/modules/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAiConfig } from '../../config/openai.config';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private openAiConfig: OpenAiConfig) {
    this.openai = new OpenAI({
      apiKey: this.openAiConfig.getApiKey(), // OpenAiConfig에서 API 키를 가져옴
    });
  }

  // 버퍼 데이터를 사용하여 이미지 분석
  async analyzeImageFromBuffer(buffer: Buffer): Promise<string> {
    try {
      // 이미지 데이터를 base64로 인코딩
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
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('이미지 분석 중 문제가 발생했습니다.');
    }
  }
}