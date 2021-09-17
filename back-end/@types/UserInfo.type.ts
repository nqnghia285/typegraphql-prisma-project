import { Gender, Role } from '@generated/type-graphql'

export interface IUserInfo {
   id: number
   name: string
   gender: Gender
   email: string
   role: Role
}
