import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OpenAiConfig } from '../../config/openai.config';

@Module({
  providers: [AiService, OpenAiConfig],
  exports: [AiService],
})
export class AiModule {}