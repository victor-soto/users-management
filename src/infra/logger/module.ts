import { Module } from '@nestjs/common'

import { ISecretsAdapter, SecretsModule } from '../secrets'
import { ILoggerAdapter } from './adapter'
import { LoggerService } from './service'

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ILoggerAdapter,
      useFactory: ({
        SUMO_LOGIC_ENDPOINT,
        SUMO_LOGIC_SOURCE_HOST,
        LOG_LEVEL,
      }: ISecretsAdapter) => {
        const logger = new LoggerService()
        logger.connect(SUMO_LOGIC_ENDPOINT, SUMO_LOGIC_SOURCE_HOST, LOG_LEVEL)
        return logger
      },
      inject: [ISecretsAdapter],
    },
  ],
  exports: [ILoggerAdapter],
})
export class LoggerModule {}
