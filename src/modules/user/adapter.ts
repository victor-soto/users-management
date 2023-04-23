import { UserCreateInput } from './types'

export abstract class IUserCreateAdapter {
  abstract execute(input: UserCreateInput): any
}
