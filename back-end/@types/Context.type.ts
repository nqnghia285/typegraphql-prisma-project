import { Request, Response } from 'express'
import { IUserInfo } from '~/@types/UserInfo.type'
import { PrismaClient } from '@prisma/client'

export interface IContext {
   req: Request
   res: Response
   user?: IUserInfo
   prisma: PrismaClient
   graphqlFields?: any
   select?: any
}
