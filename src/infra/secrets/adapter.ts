export abstract class ISecretsAdapter {
  ENV: string

  PORT: number

  POSTGRES_URL: string

  SUMO_LOGIC_ENDPOINT: string

  SUMO_LOGIC_SOURCE_HOST: string

  LOG_LEVEL: string
}
