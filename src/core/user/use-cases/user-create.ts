import {
  UsersCreateInput,
  UserCreateOutput,
  UsersCreateSchema,
} from '@/modules/user/types'

import { UserEntity } from '../entity/user'
import { IUsersRepository } from '../repository/user'
import { ApiConflictException } from '@/utils/exception'
import { ValidateSchema } from '@/utils/decorators/validate-schema.decorator'

export class UsersCreateUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  @ValidateSchema(UsersCreateSchema)
  async execute(input: UsersCreateInput): Promise<UserCreateOutput> {
    const entity = new UserEntity(input)

    const userExists = await this.userRepository.findOne({
      email: entity.email,
    })

    if (userExists) {
      throw new ApiConflictException('User already exists')
    }

    try {
      const user = await this.userRepository.create(entity)
      return user
    } catch (error) {
      throw error
    }
  }
}
