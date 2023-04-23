import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class UsersSchema extends BaseEntity {
  @Column({ type: 'integer', primary: true, generated: true })
  id: number

  @Column({ nullable: false })
  firstName: string

  @Column({ nullable: false })
  lastName: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
