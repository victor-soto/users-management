import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/models/users.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'um-user',
      password: 'um-password',
      database: 'user_management',
      // models: [User],
      autoLoadModels: true,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
