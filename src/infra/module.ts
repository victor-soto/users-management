import { Module } from '@nestjs/common'
import { PostgresDatabaseModule } from './database/postgres'
import { LoggerModule } from './logger'

@Module({
  imports: [PostgresDatabaseModule, LoggerModule],
})
export class InfraModule {}
