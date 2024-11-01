import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AiService } from '../modules/ai/ai.service';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze-image')
  @ApiOperation({ summary: '이미지 업로드 및 분석' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '이미지 분석 결과 반환', type: String })
  @ApiResponse({ status: 400, description: '이미지가 업로드되지 않았습니다.' })
  @UseInterceptors(FileInterceptor('file'))
  async analyzeImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('이미지가 업로드되지 않았습니다.');
    }

    return await this.aiService.analyzeImageFromBuffer(file.buffer);
  }
}