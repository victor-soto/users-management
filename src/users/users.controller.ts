import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common'
import CreateUserDto from './dto/create-user.dto'
import { UsersService } from './users.service'

Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.service.create(userDto)
  }

  @Get()
  get(@Query('isActive') isActive?: boolean) {
    return this.service.findAll({ isActive })
  }
}
