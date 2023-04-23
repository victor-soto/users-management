import { UsersCreateInput } from './types'

export abstract class IUsersCreateAdapter {
  abstract execute(input: UsersCreateInput): any
}

export abstract class IUsersListAdapter {
  abstract execute(): any
}
