import { ExpressContext } from 'apollo-server-express'
import dotenv from 'dotenv'
import { IContext } from '~/@types/Context.type'
import { methods } from '~/@types/MethodCollections.type'
import { prisma } from '~/prisma/@prisma'
import { Gender, Role } from '@generated/type-graphql'
import { checkMethos } from '~/utility/checkMethod'

dotenv.config()

const JWT_KEY = process.env.JWT_KEY || ''

function handleRequest({ req, res }: ExpressContext): IContext {
   const user = {
      role: Role.ADMIN,
      id: 1,
      name: 'nghia',
      gender: Gender.MALE,
      email: 'nghia@gmail.com',
   }

   // console.log('Query in handleRequest');
   // console.dir(req.body.query);

   // console.log('Method: ', checkMethos(req.body.query, methods));

   // console.log('Info: ', req);

   return { req, res, user, prisma }
}

export default handleRequest
