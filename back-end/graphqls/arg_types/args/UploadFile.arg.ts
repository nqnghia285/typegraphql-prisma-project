import 'reflect-metadata'
import { ArgsType, Field } from 'type-graphql'
import { UploadInput } from '~/graphqls/arg_types/inputs/Upload.input'

@ArgsType()
export class UploadFileArgs {
   /* Arguments */
   @Field(() => UploadInput)
   public uploadInput!: UploadInput
}
