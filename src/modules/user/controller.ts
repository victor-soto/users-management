import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { UsersCreateInput, UserCreateOutput, UsersListOutput } from './types'
import { IUsersCreateAdapter, IUsersListAdapter } from './adapter'

@Controller('users')
export class UserController {
  constructor(
    private readonly usersCreate: IUsersCreateAdapter,
    private readonly usersList: IUsersListAdapter,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: UsersCreateInput): UserCreateOutput {
    return await this.usersCreate.execute(input)
  }

  @Get()
  async list(): UsersListOutput {
    return await this.usersList.execute()
  }
}
