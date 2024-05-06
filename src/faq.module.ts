import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
