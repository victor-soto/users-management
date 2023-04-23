import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { name } from '../../../../package.json'
import { ConnectionType } from '../types'
import { IDataBaseAdapter } from '../adapter'

export class PostgresService implements IDataBaseAdapter {
  getConnection<
    TOpt extends TypeOrmModuleOptions = TypeOrmModuleOptions & { url: string },
  >({ URI }: ConnectionType): TOpt {
    return {
      type: 'postgres',
      url: URI,
      database: name,
    } as TOpt
  }
}
