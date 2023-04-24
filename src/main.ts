import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { ApiExceptionFilter } from './utils/filters/http-exception-filter'
import { ExceptionInterceptor } from './utils/interceptors/http-exception.interceptor'

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new ApiExceptionFilter())
  app.useGlobalInterceptors(new ExceptionInterceptor())

  await app.listen(3000)
}
bootstrap()
