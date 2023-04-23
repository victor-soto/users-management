import { CreateModel, IRepository } from '@/infra/repository'
import { UserEntity } from '../entity/user'

export abstract class IUserRepository extends IRepository<UserEntity> {
  abstract executeWithTransaction(input: UserEntity): Promise<CreateModel>
}
