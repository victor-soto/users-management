import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, catchError } from 'rxjs'

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    executionContext: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        error.status = [
          error.status,
          error?.response?.status,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ].find(Boolean)
        const headers = executionContext.getArgs()[0]?.headers
        this.sanitizeError(error)
        if (typeof error === 'object' && !error.traceId) {
          error.traceId = headers.traceId
        }
        const context = `${executionContext.getClass().name}/${
          executionContext.getHandler().name
        }`
        error.context = error.context || context
        throw error
      }),
    )
  }

  sanitizeError(error: any) {
    if (typeof error?.response === 'object' && error?.isAxiosError) {
      error.getResponse = () => ({ ...error?.response?.data?.error })
      error.getStatus = () =>
        [error?.response?.data?.error?.code, error?.status].find(Boolean)
      error.message = [
        error?.response?.data?.error?.message,
        error.message,
      ].find(Boolean)
      error.traceId = error?.response?.data?.error?.traceId
    }
  }
}
