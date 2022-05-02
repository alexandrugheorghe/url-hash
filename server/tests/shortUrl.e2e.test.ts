import { ApolloServer, ExpressContext } from 'apollo-server-express'
import Schema from '../schema'
import buildResolvers from '../resolvers'
import * as dotenv from 'dotenv'
import mongoose, { connectToDb } from '../utils/dbConnector'

const createShortUrlMutation = `
	mutation createShortUrl($longUrl: String!){
		shortenUrl(longUrl: $longUrl) {
			id
			originalUrl
			shortUrl
		}
	}
`

const listShortUrlQuery = `
	query listShortUrls($afterId: String, $limit: Int) {
		shortUrls(afterId: $afterId, limit: $limit) {
			id
			originalUrl
			shortUrl
		}
	}
`

let testServer: ApolloServer
beforeAll(async () => {
  dotenv.config()

  testServer = new ApolloServer({
	typeDefs: Schema.shortUrlSchema,
	resolvers: buildResolvers('http://dummy.com/'),
  });
  const url = process.env.TEST_MONGO_URL
  if (!url) {
	throw new Error('No test MongoDB config provided.')
  }
  await connectToDb(url)
  await testServer.start();
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await Promise.all([
    testServer.stop(),
  	mongoose.disconnect(),
  ])
})

it('creates a single short url', async () => {
  const res = await testServer.executeOperation({ query: createShortUrlMutation, variables: { longUrl: 'http://longurl.com' } });
  expect(res.errors).toBeUndefined()
  expect(res.data?.shortenUrl.originalUrl).toBe('http://longurl.com');
})

it('lists short urls', async () => {
  const results = []
  results.push(await testServer.executeOperation({ query: createShortUrlMutation, variables: { longUrl: 'http://longurl1.com' } }))
  results.push(await testServer.executeOperation({ query: createShortUrlMutation, variables: { longUrl: 'http://longurl2.com' } }))
  results.push(await testServer.executeOperation({ query: createShortUrlMutation, variables: { longUrl: 'http://longurl3.com' } }))

  const res = await testServer.executeOperation({ query: listShortUrlQuery, variables: { limit: 2, afterId: results[1]?.data?.shortenUrl.id} });
  expect(res.errors).toBeUndefined()

  expect(res.data?.shortUrls.length).toBe(2);
  expect(res.data?.shortUrls[0]).toStrictEqual(results[1].data?.shortenUrl)
  expect(res.data?.shortUrls[1]).toStrictEqual(results[2].data?.shortenUrl)
})
