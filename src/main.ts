import { NestFactory } from '@nestjs/core';
import { FaqModule } from './faq.module';

async function bootstrap() {
  const app = await NestFactory.create(FaqModule);
  await app.listen(3000);
}
bootstrap();
