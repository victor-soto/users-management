import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common'
import { utilities } from 'nest-winston'
import { v4 as uuidv4 } from 'uuid'

import { ILoggerAdapter } from './adapter'
import { ErrorType, MessageType } from './types'
import * as winston from 'winston'
import { SumoLogic } from 'winston-sumologic-transport'
import { BaseException } from '@/utils/exception'

@Injectable({ scope: Scope.REQUEST })
export class LoggerService implements ILoggerAdapter {
  logger: winston.Logger
  private app: string

  connect(url: string, host: string, logLevel?: string): void {
    const winstonLogger = winston.createLogger({
      transports: [
        new SumoLogic({
          url,
          customSourceName: host,
          onError: (err) => {
            console.log(err)
            return Promise.resolve()
          },
        }),
        new winston.transports.Console({
          // format: winston.format.json(),
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(this.app, {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
      level: logLevel,
    })
    this.logger = winstonLogger
  }

  setApplication(app: string): void {
    this.app = app
  }

  log(message: string): void {
    this.logger.info(message)
  }

  info({ message, context, obj }: MessageType): void {
    Object.assign(obj, { context })
    this.logger.info(message, [obj, message].find(Boolean))
  }

  warn({ message, context, obj }: MessageType): void {
    Object.assign(obj, { context })
    this.logger.warn(message, [obj, message].find(Boolean))
  }

  error(error: ErrorType, message?: string, context?: string): void {
    const errorResponse = this.getErrorResponse(error)

    const response =
      error instanceof BaseException
        ? { statusCode: error['statusCode'], message: error?.message }
        : errorResponse?.value()

    const type = {
      Error: BaseException.name,
    }[error?.name]

    this.logger.error(
      {
        ...response,
        context: [context, this.app].find(Boolean),
        type: [type, error?.name].find(Boolean),
        traceId: this.getTraceId(error),
        timestamp: new Date().toISOString(),
        application: this.app,
        stack: error.stack,
        message: message,
      },
      message,
    )
  }

  fatal(error: ErrorType, message?: string, context?: string): void {
    this.logger.error(message, {
      ...(error.getResponse() as object),
      context: [context, this.app].find(Boolean),
      type: error.name,
      traceid: this.getTraceId(error),
      timestamp: new Date().toISOString(),
      application: this.app,
      stack: error.stack,
    })
  }

  private getErrorResponse(error: ErrorType): any {
    const isFunction = typeof error?.getResponse === 'function'
    return [
      {
        conditional: typeof error === 'string',
        value: () => new InternalServerErrorException(error).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'string',
        value: () =>
          new BaseException(
            error.getResponse(),
            [error.getStatus(), error['status']].find(Boolean),
          ).getResponse(),
      },
      {
        conditional: isFunction && typeof error.getResponse() === 'object',
        value: () => error?.getResponse(),
      },
      {
        conditional: [
          error?.name === Error.name,
          error?.name == TypeError.name,
        ].some(Boolean),
        value: () =>
          new InternalServerErrorException(error.message).getResponse(),
      },
    ].find((c) => c.conditional)
  }

  private getTraceId(error): string {
    if (typeof error === 'string') return uuidv4()
    return error.traceId
  }
}
