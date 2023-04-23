import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserController } from './controller'
import { IUserCreateAdapter } from './adapter'
import { IUserRepository } from '@/core/user/repository/user'
import { UserCreateUseCase } from '@/core/user/use-cases/user-create'
import { UserEntity } from '@/core/user/entity/user'
import { UserRepository } from './repository'
import { UsersSchema } from './schema'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: IUserCreateAdapter,
      useFactory: (userRepository: IUserRepository) => {
        return new UserCreateUseCase(userRepository)
      },
      inject: [IUserRepository],
    },
    {
      provide: IUserRepository,
      useFactory: async (repository: Repository<UsersSchema & UserEntity>) => {
        return new UserRepository(repository)
      },
      inject: [getRepositoryToken(UsersSchema)],
    },
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UserController)
  }
}
