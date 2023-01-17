export default class CreateUserDto {
  constructor(name: string, lastName: string, email: string, password: string) {
    this.name = name
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  name: string
  lastName: string
  email: string
  password: string
}
