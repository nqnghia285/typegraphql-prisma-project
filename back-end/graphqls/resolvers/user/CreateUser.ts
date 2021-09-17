import 'reflect-metadata'
import { Arg, Args, Ctx, Info, Mutation, Resolver } from 'type-graphql'
import { CreateUserResolver, CreateUserArgs, User, Gender, Role } from '@generated/type-graphql'
import { IContext } from '~/@types/Context.type'
import { GraphQLResolveInfo } from 'graphql'

@Resolver(() => User)
export class CreateUser extends CreateUserResolver {
	@Mutation(() => User)
	async createUser(@Args() args: CreateUserArgs, @Ctx() context: any, @Info() info: any) {
		const newUser = new User()
		newUser.createdAt = new Date()
		newUser.updatedAt = new Date()
		newUser.email = 'nghia@gmail.com'
		newUser.gender = Gender.MALE
		newUser.id = 1
		newUser.name = 'Nghia'
		newUser.password = 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
		newUser.role = Role.ADMIN

		console.log('args: ', args)

		return newUser
	}
}
