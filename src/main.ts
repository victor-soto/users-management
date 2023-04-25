import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { ApiExceptionFilter } from './utils/filters/http-exception-filter'
import { ExceptionInterceptor } from './utils/interceptors/http-exception.interceptor'
import { name } from '../package.json'
import { ILoggerAdapter } from './infra/logger'
import { HttpLoggerInterceptor } from './utils/interceptors/http-logger.interceptor'

async function bootstrap() {
  initializeTransactionalContext()
  const app = await NestFactory.create(AppModule)
  const loggerService = app.get(ILoggerAdapter)
  loggerService.setApplication(name)
  app.useLogger(loggerService)

  app.useGlobalFilters(new ApiExceptionFilter())
  app.useGlobalInterceptors(
    new ExceptionInterceptor(),
    new HttpLoggerInterceptor(loggerService),
  )

  await app.listen(3000)
}
bootstrap()
