import { z } from 'zod'
import { IEntity } from '@/utils/entity'

export const UserEntitySchema = z.object({
  id: z.number().int().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

type User = z.infer<typeof UserEntitySchema>

export class UserEntity implements IEntity {
  id: number
  fistName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(entity: User) {
    entity.id = [entity?.id, 0].find(Number.isInteger)
    Object.assign(this, UserEntitySchema.parse(entity))
  }
}
