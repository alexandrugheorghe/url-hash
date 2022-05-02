import Express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express'
import { IExecutableSchemaDefinition } from '@graphql-tools/schema'
import Schema from './server/schema'
import buildResolvers from './server/resolvers'
import * as dotenv from 'dotenv'
import { connectToDb } from './server/utils/dbConnector'

dotenv.config()

const port = process.env.PORT
const app = Express()
const mongoUrl = process.env.MONGO_URL
if (!mongoUrl) {
  throw new Error('No MongoDB config provided.')
}
const baseUrl = process.env.BASE_URL
if (!baseUrl) {
  throw new Error('No base url config provided.')
}


async function startApolloServer(
  typeDefs: IExecutableSchemaDefinition['typeDefs'],
  resolvers: IExecutableSchemaDefinition['resolvers']
) {
  // @ts-ignore Because `mongoUrl` is properly checked for undefined
  await connectToDb(mongoUrl)
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
}

startApolloServer(Schema.shortUrlSchema, buildResolvers(baseUrl)).then(() => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
})
