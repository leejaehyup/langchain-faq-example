import { Controller, Get, Query } from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller()
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get('/faq')
  async getFaqByQuery(@Query('question') question) {
    return this.faqService.getFaqByQuery(question);
  }
}
