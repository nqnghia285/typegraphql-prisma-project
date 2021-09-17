import graphqlFields from 'graphql-fields'
import { MiddlewareFn } from 'type-graphql'
import { parseSelectedFields } from 'prisma-parse-selected-fields'

export const ResolverParamsParser: MiddlewareFn<{ graphqlFields?: any; select: any }> = async ({ context, info }, next) => {
   const parseFields = graphqlFields(info, {}, { processArguments: false, excludedFields: ['__typename'] })
   context.graphqlFields = parseFields
   context.select = parseSelectedFields(info, { processArguments: false, excludedFields: ['__typename'] })
   await next()
}
