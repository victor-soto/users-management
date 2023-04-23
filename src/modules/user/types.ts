import { z } from 'zod'

import { CreateModel } from '@/infra/repository/types'
import { UserEntitySchema as UsersEntitySchema } from '@/core/user/entity/user'

type Schema = z.infer<typeof UsersEntitySchema>

export const UsersCreateSchema = UsersEntitySchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
})

export type UsersCreateInput = z.infer<typeof UsersCreateSchema>
export type UserCreateOutput = Promise<CreateModel>
export type UsersListOutput = Promise<Schema[]>
