import { Logger } from 'winston'
import { ErrorType, MessageType } from './types'

export abstract class ILoggerAdapter<T extends Logger = Logger> {
  abstract logger: T
  abstract connect(url: string, host: string, logLevel?: string): void
  abstract setApplication(app: string): void
  abstract log(message: string): void
  abstract info({ message, context, obj }: MessageType): void
  abstract warn({ message, context, obj }: MessageType): void
  abstract error(error: ErrorType, message?: string, context?: string): void
  abstract fatal(error: ErrorType, message?: string, context?: string): void
}
