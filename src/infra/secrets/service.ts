import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ISecretsAdapter } from './adapter'

@Injectable()
export class SecretsService extends ConfigService implements ISecretsAdapter {
  constructor() {
    super()
  }

  ENV = this.get('ENV')
  PORT = this.get('PORT')
  POSTGRES_URL = `postgresql://${this.get('DB_USERNAME')}:${this.get(
    'DB_PASSWORD',
  )}@${this.get('DB_HOST')}:${this.get('DB_PORT')}/${this.get('DB_DATABASE')}`
}
