// todo: remove this file
import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
// import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  // imports: [SequelizeModule.forFeature([User])],
  // providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
