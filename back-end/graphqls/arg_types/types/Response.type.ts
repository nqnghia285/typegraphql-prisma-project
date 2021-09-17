import 'reflect-metadata'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class IResponse {
   @Field({ nullable: true })
   public isSuccess?: boolean

   @Field({ nullable: true })
   public message?: string
}
