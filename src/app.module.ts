import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { InfraModule } from './infra/module'
import { UsersModule } from './modules/user/module'

@Module({
  imports: [InfraModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
