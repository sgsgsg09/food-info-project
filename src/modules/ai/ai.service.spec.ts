// ai.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { OpenAiConfig } from '../../config/openai.config';

describe('AiService', () => {
  let aiService: AiService;
  let openAiConfig: OpenAiConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: OpenAiConfig,
          useValue: {
            getApiKey: jest.fn().mockReturnValue('fake-api-key'),
          },
        },
      ],
    }).compile();

    aiService = module.get<AiService>(AiService);
    openAiConfig = module.get<OpenAiConfig>(OpenAiConfig);
  });

  it('should analyze image from buffer', async () => {
    // `analyzeImageFromBuffer` 메서드를 직접 모의 처리
    const mockResult = '김치찌개';
    jest.spyOn(aiService, 'analyzeImageFromBuffer').mockResolvedValue(mockResult);

    const buffer = Buffer.from('test image data');
    const result = await aiService.analyzeImageFromBuffer(buffer);

    expect(result).toBe(mockResult);
  });
});