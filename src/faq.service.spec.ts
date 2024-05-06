import { Test, TestingModule } from '@nestjs/testing';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

describe('FaqService', () => {
  let faqService: FaqService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FaqController],
      providers: [FaqService],
    }).compile();

    faqService = new FaqService();
    await faqService.saveDataInVectorStore();
  });

  describe('faq', () => {
    it('should return string type', async () => {
      expect(typeof (await faqService.getFaqByQuery('애플 스토어란?'))).toBe(
        'string',
      );
    });
  });
});
