import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { ZodError } from 'zod'
import { AxiosError } from 'axios'
import { Response } from 'express'

import { BaseException, ErrorModel } from '../exception'
import * as errorStatus from '../http-status.json'

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status: number = this.getStatus(exception)
    exception.traceId = [exception.traceId, request['id']].find(Boolean)
    const message = this.getMessage(exception)
    response.status(status).json({
      error: {
        code: status,
        traceId: exception.traceId,
        message: [errorStatus[status], message].find(Boolean),
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    } as ErrorModel)
  }

  getMessage(exception: BaseException): string {
    if (exception instanceof ZodError) {
      return exception.issues
        .map((error) => `${error.path} ${error.message}`)
        .join(', ')
    }

    if (exception instanceof AxiosError) {
      const axiosError = exception as AxiosError
      return axiosError.response?.data['message']
    }

    return exception.message
  }

  getStatus(exception: BaseException): number {
    if (exception instanceof ZodError) {
      return HttpStatus.BAD_REQUEST
    }

    return exception instanceof HttpException
      ? exception.getStatus()
      : [exception['status'], HttpStatus.INTERNAL_SERVER_ERROR].find(Boolean)
  }
}
