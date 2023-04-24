import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { ApiExceptionFilter } from './utils/filters/http-exception-filter'

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ApiExceptionFilter())

  await app.listen(3000)
}
bootstrap()
