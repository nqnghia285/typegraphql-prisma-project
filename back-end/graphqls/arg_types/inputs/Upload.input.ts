import 'reflect-metadata'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Field, InputType } from 'type-graphql'
import { Length } from 'class-validator'

@InputType()
export class UploadInput {
   @Field()
   @Length(1, 60)
   title!: string

   @Field((type) => GraphQLUpload)
   file!: FileUpload
}
