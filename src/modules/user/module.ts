import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserController as UsersController } from './controller'
import { IUsersCreateAdapter, IUsersListAdapter } from './adapter'
import { IUsersRepository } from '@/core/user/repository/user'
import { UsersCreateUseCase } from '@/core/user/use-cases/user-create'
import { UserEntity } from '@/core/user/entity/user'
import { UserRepository } from './repository'
import { UsersSchema } from './schema'
import { UsersListUseCase } from '@/core/user/use-cases/user-list'

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema])],
  controllers: [UsersController],
  providers: [
    {
      provide: IUsersCreateAdapter,
      useFactory: (userRepository: IUsersRepository) => {
        return new UsersCreateUseCase(userRepository)
      },
      inject: [IUsersRepository],
    },
    {
      provide: IUsersListAdapter,
      useFactory: (userRepository: IUsersRepository) => {
        return new UsersListUseCase(userRepository)
      },
      inject: [IUsersRepository],
    },
    {
      provide: IUsersRepository,
      useFactory: (repository: Repository<UsersSchema & UserEntity>) => {
        return new UserRepository(repository)
      },
      inject: [getRepositoryToken(UsersSchema)],
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UsersController)
  }
}
