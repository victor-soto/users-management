import {
  UserCreateInput,
  UserCreateOutput,
  UserCreateSchema,
} from '@/modules/user/types'

import { UserEntity } from '../entity/user'
import { IUserRepository } from '../repository/user'
import { ApiConflictException } from '@/utils/exception'
import { ValidateSchema } from '@/utils/decorators/validate-schema.decorator'

export class UserCreateUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  @ValidateSchema(UserCreateSchema)
  async execute(input: UserCreateInput): Promise<UserCreateOutput> {
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
