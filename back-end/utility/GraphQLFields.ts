import { GraphQLResolveInfo } from 'graphql'
import graphqlFields, { Options } from 'graphql-fields'

export interface GraphQLFieldsOptions extends Options {}

export interface GetFieldsByLevelOptions {
   /* Get fields of objectFields at this level */
   level?: number
   /* If is true, all value of fields are set true. Otherwise, don't set anything value for fields. If is {value:boolean}, fields are set with this value. */
   setValueOfField?: boolean | { value: boolean }
   /* If is true, keeps all fields that are node and leaf. Otherwise, remove only all fields that are node. */
   keepNode?: boolean
}

export function getFields(info: GraphQLResolveInfo, object?: Object, options?: GraphQLFieldsOptions): unknown {
   return graphqlFields(info, object, options)
}

export function getFieldsByLevel(objectFields: any, options?: GetFieldsByLevelOptions): unknown {
   /* Check level. If options is undefined, default set level is 1 and setValueOfField is true and keepNode is false */
   if (!options) {
      options = { level: 1, setValueOfField: true, keepNode: false }
   }

   /* Convert fields of objectFields to array at level 1 */
   const fields = Object.entries(objectFields)

   // const nodes: Object[] = []

   // fields.forEach((e) => {
   //    nodes.push({ [e[0]]: e[1] })
   // })

   for (let i = 0; i < options.level!; i++) {
      if (i + 1 !== options.level!) {
         const newNodes: Object[] = []
         fields.forEach((e, i) => {
            if (e[1] instanceof Object) {
               if (Object.keys(e[1]).length < 1) {
                  fields.splice(i, 1)
               }
            }
         })
      }
   }

   /*  */

   return undefined
}
