import { IUsersCreateAdapter } from '@/modules/user/adapter'
import { IUsersRepository } from '../../repository/user'
import { Test } from '@nestjs/testing'
import { UsersCreateUseCase } from '../users-create'
import { expectZodError } from '@/utils/tests'
import { ApiConflictException } from '@/utils/exception'

describe('UsersCreateUseCase', () => {
  let useCase: IUsersCreateAdapter
  let repository: IUsersRepository

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        {
          provide: IUsersRepository,
          useValue: {},
        },
        {
          provide: IUsersCreateAdapter,
          useFactory: (userRepository: IUsersRepository) => {
            return new UsersCreateUseCase(userRepository)
          },
          inject: [IUsersRepository],
        },
      ],
    }).compile()
    useCase = app.get(IUsersCreateAdapter)
    repository = app.get(IUsersRepository)
  })

  describe('execute', () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@example.com',
      password: '123456',
    }

    it('return created user when it does not exists', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null)
      repository.create = jest.fn().mockResolvedValue(user)
      await expect(useCase.execute(user)).resolves.toEqual(user)
    })

    it('return ApiConflictException when user already exists', async () => {
      repository.findOne = jest.fn().mockResolvedValue(user)
      await expect(useCase.execute(user)).rejects.toThrowError(
        ApiConflictException,
      )
    })

    it('return error when invalid parameters', async () => {
      await expectZodError(
        () => useCase.execute({}),
        (issues) =>
          expect(issues).toEqual([
            { message: 'Required', path: 'firstName' },
            { message: 'Required', path: 'lastName' },
            { message: 'Required', path: 'email' },
            { message: 'Required', path: 'password' },
          ]),
      )
    })
  })
})
