import { Test, TestingModule } from '@nestjs/testing'
import CreateUserDto from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

jest.mock('./users.service')

describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('#createUser', () => {
    it('should return created user', async () => {
      const expectedUser: IUser = {
        id: 1,
        name: 'John',
        lastName: 'Doe',
        email: 'user@example.com',
      }
      jest
        .spyOn(service, 'create')
        .mockImplementation(
          () => new Promise((resolve) => resolve(expectedUser)),
        )
      expect(
        await controller.create({
          name: 'John',
          lastName: 'Doe',
          email: 'user@example.com',
        } as CreateUserDto),
      ).toBe(expectedUser)
    })
  })

  describe('#retrieve', () => {
    it('get active users', async () => {
      const expectedUsers = [
        {
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          id: 2,
          name: 'Martin',
          lastName: 'Fowler',
          email: 'martin.fowler@example.com',
        },
      ]
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(
          () => new Promise((resolve) => resolve(expectedUsers)),
        )
      expect(await controller.get(true)).toBe(expectedUsers)
    })
  })
})
