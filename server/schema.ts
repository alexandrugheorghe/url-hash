const shortUrlSchema = `
	type Query {
		shortUrls(afterId: String, limit: Int): [ShortUrl]!
	}
	type Mutation {
		shortenUrl(longUrl: String!): ShortUrl!
	}
	type ShortUrl {
		id: ID!
		originalUrl: String!
		shortUrl: String!
	}
`

export default {
  shortUrlSchema
}
