import { Context } from 'apollo-server-core'
import { hashFunction } from './utils/hash'
import shortUrlModel from './models/shortUrl'
import UrlHashServiceFactory from './services/urlHashService'
import ShortUrlServiceFactory from './services/shortUrlService'

interface PaginationArg {
  afterId: string
  limit: number
}

interface CreateShortUrlArgs {
  longUrl: string
}

const buildResolvers = (baseUrl: string) => {
  const hashingService = UrlHashServiceFactory(hashFunction)
  const shortUrlService = ShortUrlServiceFactory({
	shortUrlModel,
	hashingService,
	baseUrl
  })
  return {
	Query: {
	  shortUrls: (context: Context, { afterId, limit }: PaginationArg) => {
		return shortUrlService.listShortUrls(afterId, limit)
	  }
	},
	Mutation: {
	  shortenUrl: (context: Context, { longUrl }: CreateShortUrlArgs) => {
		return shortUrlService.createShortUrl(longUrl)
	  }
	}
  }
}

export default buildResolvers
