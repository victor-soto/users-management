import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import CreateUserDto from './dto/create-user.dto'
import { IUser } from './interfaces/user.interface'
import { User } from './models/users.model'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(payload: CreateUserDto): Promise<IUser> {
    const createdUser = this.userModel.create({ ...payload })
    return createdUser.then((user) => this.mapToIUser(user))
  }

  findAll(params): Promise<IUser[]> {
    return this.userModel
      .findAll({ where: { [Op.and]: [{ ...params }] } })
      .then((users) => users.map((user) => this.mapToIUser(user)))
  }

  private mapToIUser(user: User): IUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    }
  }
}
