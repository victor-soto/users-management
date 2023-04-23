import { z } from 'zod'

import { CreateModel } from '@/infra/repository/types'
import { UserEntitySchema as UsersEntitySchema } from '@/core/user/entity/user'

type Schema = z.infer<typeof UsersEntitySchema>

export const UsersCreateSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
  email: z.string().email(),
  password: z.string().min(6),
})

export type UsersCreateInput = z.infer<typeof UsersCreateSchema>
export type UserCreateOutput = Promise<CreateModel>
export type UsersListOutput = Promise<Schema[]>
