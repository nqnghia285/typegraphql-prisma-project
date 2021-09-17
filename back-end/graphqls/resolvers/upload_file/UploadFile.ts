import 'reflect-metadata'
import { createWriteStream } from 'fs'
import path, { parse } from 'path'
import { Args, Ctx, Mutation, Resolver } from 'type-graphql'
import { IContext } from '~/@types/Context.type'
import { UploadFileArgs } from '~/graphqls/arg_types/args/UploadFile.arg'

@Resolver()
export class UploadFile {
   @Mutation(() => Boolean)
   async uploadFile(
      @Args() { uploadInput }: UploadFileArgs,
      @Ctx() context: IContext
   ): Promise<boolean> {
      const { title, file } = uploadInput
      const { filename, mimetype, encoding, createReadStream } = await file

      const { ext } = parse(filename)

      return await new Promise(async (resolve, reject) => {
         const stream = createReadStream()

         await stream
            .pipe(createWriteStream(path.join(`${process.cwd()}/upload/${title}${ext}`)))
            .on('finish', () => {
               console.log('Upload file success!')
               return resolve(true)
            })
            .on('error', () => {
               console.log('Upload file failure!')
               return reject(false)
            })
      })
   }
}
