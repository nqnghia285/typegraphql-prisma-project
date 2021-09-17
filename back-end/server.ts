import { setTokenName } from 'authenticate-user'
import { setup } from 'config-express-app'
import express, { Request, Response } from 'express'
import { UploadOptions } from 'graphql-upload'
import { createServer } from 'http'
import path from 'path'
import { ConfigOptions, createDefaultConfig, startApolloServer } from 'setup-apollo-server-express'
import { createSchema } from '~/graphqls'
import { createData } from '~/prisma/@prisma/data'
import formatResponse from '~/utility/FormatResponse'
import handleRequest from '~/utility/HandleRequest'
import handleResolvers from '~/utility/HandleResolvers'

async function main() {
   const PORT = parseInt(process.env.PORT!, 10)
   const HOST = process.env.HOST!
   const ORIGIN = process.env.ORIGIN!
   const GRAPHQL_PATH = process.env.GRAPHQL_PATH!

   const TOKEN_NAME = process.env.TOKEN_NAME!

   setTokenName(TOKEN_NAME)

   const app = express()
   const httpServer = createServer(app)

   // Setup Express app
   const staticDir = { dirname: __dirname, publicDir: 'public' }

   setup(app, staticDir, ORIGIN) // config and parser are default setup

   // Home page
   app.get('/', (req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), '/public/index.html'))
   })

   // Build schema for graphql server
   const schema = await createSchema()

   // Create config
   const configOptions: ConfigOptions = {
      schema: schema,
      context: handleRequest,
      handleResolver: handleResolvers,
      formatResponse: formatResponse,
   }
   const config = createDefaultConfig(configOptions)

   // config upload options
   const uploadOptions: UploadOptions = {
      maxFileSize: 2e7,
      maxFiles: 1,
   }

   // Start apollo server express
   const apolloServer = await startApolloServer(
      config,
      app,
      httpServer,
      HOST,
      PORT,
      GRAPHQL_PATH,
      uploadOptions
   )

   return { app, apolloServer }
}

export const instance = main()

setTimeout(createData, 5000)

export default instance
