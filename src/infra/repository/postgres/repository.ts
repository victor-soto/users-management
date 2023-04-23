import {
  BaseEntity,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm'

import { IEntity } from '@/utils/entity'
import { IRepository } from '../adapter'
import { CreateModel } from '../types'

export abstract class PostgresRepository<T extends BaseEntity & IEntity>
  implements Omit<IRepository<T>, 'updateMany' | 'seed'>
{
  constructor(readonly repository: Repository<T & IEntity>) {}

  async create<TOptions = SaveOptions>(
    entity: T,
    options?: TOptions,
  ): Promise<CreateModel> {
    const createdModel = this.repository.create(entity)
    const model = await createdModel.save(options)
    return { created: model.hasId(), id: model.id }
  }

  async findOne<TQuery = Partial<T>>(filter: TQuery): Promise<T> {
    Object.assign(filter, { deletedAt: null })
    return await this.repository.findOne({ where: filter } as FindOneOptions<T>)
  }

  async find<TQuery = FindOptionsWhere<T> | FindOptionsWhere<T>[]>(
    filter: TQuery,
  ): Promise<T[]> {
    return await this.repository.findBy({ ...filter } as
      | FindOptionsWhere<T>
      | FindOptionsWhere<T>[])
  }
}
