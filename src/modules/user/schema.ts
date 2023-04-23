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
  name: string

  @Column({ nullable: false })
  lastName: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
