import { UserEntity as UsersEntity } from '@/core/user/entity/user'
import { PostgresRepository } from '@/infra/repository/postgres/repository'
import { Injectable } from '@nestjs/common'
import { UsersSchema } from './schema'
import { IUserRepository } from '@/core/user/repository/user'
import { Repository } from 'typeorm'

@Injectable()
export class UserRepository
  extends PostgresRepository<UsersSchema & UsersEntity>
  implements Partial<IUserRepository>
{
  constructor(readonly repository: Repository<UsersSchema & UsersEntity>) {
    super(repository)
  }
}
