import { FindOptionsWhere, SaveOptions } from 'typeorm'

import { CreateModel } from './types'

export abstract class IRepository<T> {
  abstract create<TOptions = SaveOptions>(
    entity: T,
    options?: TOptions,
  ): Promise<CreateModel>

  abstract findOne<TQuery = Partial<T>>(filter: TQuery): Promise<T>

  abstract find<TQuery = FindOptionsWhere<T> | FindOptionsWhere<T>[]>(
    filter: TQuery,
  ): Promise<T[]>
}
