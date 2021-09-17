import { AuthChecker } from 'type-graphql'
import { IContext } from '~/@types/Context.type'

export const AuthorizeAccess: AuthChecker<IContext> = async ({ root, args, context, info }, roles) => {
   const { user } = context
   const isAccess = roles.includes(user!.role)

   const method = info.fieldName

   if (isAccess) {
      console.log(`Allow access: ${method}`)
   } else {
      console.log(`Don't allow access: ${method}`)
   }

   return isAccess
}
