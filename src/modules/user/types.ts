import { z } from 'zod'
import { CreateModel } from '@/infra/repository/types'

export const UserCreateSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
  email: z.string().email(),
  password: z.string().min(6),
})

export type UserCreateInput = z.infer<typeof UserCreateSchema>
export type UserCreateOutput = Promise<CreateModel>
