import { z } from 'zod'
import { IEntity } from '@/utils/entity'

export const UserEntitySchema = z.object({
  id: z.number(),
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

type User = z.infer<typeof UserEntitySchema>

export class UserEntity implements IEntity {
  id: number
  name: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(entity: User) {
    Object.assign(this, UserEntitySchema.parse(entity))
  }
}
