import { GraphQLResolveInfo } from 'graphql'
import graphqlFields, { Options } from 'graphql-fields'

export interface GraphQLFieldsOptions extends Options {}
export interface Info extends GraphQLResolveInfo {}

/**
 * @method convertSelectedFieldsAST Convert AST object to select object in Prisma.
 * @param selectFieldsAST any
 * @returns any
 */
export function convertSelectedFieldsAST(selectFieldsAST: any): any {
   const entries = Object.entries(selectFieldsAST)

   entries.forEach((e) => {
      if (!(!(e[1] instanceof Array) && e[1] instanceof Object && Object.keys(e[1]).length > 0)) {
         selectFieldsAST[e[0]] = true
      } else {
         selectFieldsAST[e[0]] = {
            select: convertSelectedFieldsAST(selectFieldsAST[e[0]]),
         }
      }
   })

   return selectFieldsAST
}

/**
 * @method parseSelectedFieldsAST Convert AST of info object to select object in Prisma.
 * @param info Info
 * @param options GraphQLFieldsOptions | undefined
 * @returns any
 */
export function parseSelectedFieldsAST(info: Info, options?: GraphQLFieldsOptions): any {
   const selectFieldsAST = graphqlFields(info, {}, options)
   return convertSelectedFieldsAST(selectFieldsAST)
}
