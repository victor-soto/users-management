import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { UserCreateInput, UserCreateOutput } from './types'
import { IUserCreateAdapter } from './adapter'

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: IUserCreateAdapter) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: UserCreateInput): UserCreateOutput {
    return this.userUseCases.execute(input)
  }

  @Get()
  // todo: remove any
  get(@Query('isActive') isActive?: boolean): any {
    // return this.service.findAll({ isActive })
  }
}
