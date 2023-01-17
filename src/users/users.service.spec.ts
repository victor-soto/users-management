import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import CreateUserDto from './dto/create-user.dto'
import { User } from './models/users.model'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService
  const mockUser = {
    create: () =>
      new Promise((resolve) => {
        return resolve({
          id: 1,
          name: 'John',
          lastName: 'Doe',
          email: 'user@example.com',
          password: '123456',
        } as User)
      }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User), useValue: mockUser },
      ],
      controllers: [],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createUser', () => {
    it('should create user', async () => {
      // Arrange
      const payload = new CreateUserDto(
        'John',
        'Doe',
        'user@example.com',
        '123456',
      )
      // Act
      const user = await service.create(payload)
      // Accept
      const expected = {
        email: 'user@example.com',
        id: 1,
        lastName: 'Doe',
        name: 'John',
      }
      expect(user).toStrictEqual(expected)
      // expect(user).toBe({ ...payload, id: 1 })
    })
  })
})
