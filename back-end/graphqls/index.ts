import 'reflect-metadata'
import {
   applyResolversEnhanceMap,
   Gender,
   ResolverActionsConfig,
   ResolversEnhanceMap,
   Role,
} from '@generated/type-graphql'
import { Authorized, buildSchema, registerEnumType, UseMiddleware } from 'type-graphql'
import { AuthorizeAccess } from '~/graphqls/middlewares/AuthorizeAccess.middleware'
import { ResolverParamsParser } from '~/graphqls/middlewares/ResolverParamsParser.middleware'
import { ResolveTime } from '~/graphqls/middlewares/ResolveTime.middleware'
import { DateScalar } from '~/graphqls/scalar_types/Date.type'

export async function createSchema() {
   registerEnumType(Gender, { name: 'Gender', description: 'The basic Gender' })
   registerEnumType(Role, { name: 'Role', description: 'The basic Role' })

   const pathResolvers = __dirname + '/resolvers/**/*.{resolver.ts,ts}'

   const userActionsConfig: ResolverActionsConfig<'User'> = {
      createUser: [Authorized(Role.ADMIN)],
      _all: [UseMiddleware(ResolverParamsParser)],
   }

   const resolversEnhanceMap: ResolversEnhanceMap = {
      User: userActionsConfig,
   }

   applyResolversEnhanceMap(resolversEnhanceMap)

   return await buildSchema({
      resolvers: [pathResolvers],
      // scalarsMap: [{ type: Date, scalar: DateScalar }],
      globalMiddlewares: [ResolveTime],
      authChecker: AuthorizeAccess,
      validate: false,
   })
}
