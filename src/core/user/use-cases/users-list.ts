import { IUsersRepository } from '../repository/user'

export class UsersListUseCase {
  constructor(private readonly userRepository: IUsersRepository) {}

  async execute() {
    return await this.userRepository.find({ active: true })
  }
}
