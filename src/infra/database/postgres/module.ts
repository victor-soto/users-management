import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import { ISecretsAdapter } from '@/infra/secrets/adapter'
import { PostgresService } from './service'
import { DataSource } from 'typeorm'
import { SecretsModule } from '@/infra/secrets/module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({ POSTGRES_URL }: ISecretsAdapter) => {
        const connection = new PostgresService().getConnection({
          URI: POSTGRES_URL,
        })
        return {
          ...connection,
          timeout: 5000,
          connectionTimeout: 5000,
          autoLoadEntities: true,
          synchronize: true,
          migrationsTableName: 'migrations_collection',
        }
      },
      async dataSourceFactory(options) {
        return addTransactionalDataSource(new DataSource(options))
      },
      imports: [SecretsModule],
      inject: [ISecretsAdapter],
    }),
  ],
})
export class PostgresDatabaseModule {}
