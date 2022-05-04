import ShortUrlModel from '../models/shortUrl'
import { UrlHashService } from './urlHashService'

export interface ShortUrlService {
  createShortUrl(longUrl: string): Promise<ShortUrlResult | null>
  listShortUrls(afterId?: string, limit?: number): Promise<Array<ShortUrlResult | null>>
  getShortUrl(shortUrl: string): Promise<ShortUrlResult | null>
}

interface Dependencies {
  shortUrlModel: typeof ShortUrlModel,
  hashingService: UrlHashService,
  baseUrl: string
}

interface ShortUrlResult {
  id: string
  originalUrl: string
  shortUrl: string
}

function documentMapper(document: any): ShortUrlResult | null{
  return document ? {
    id: document._id,
    shortUrl: document.shortUrl,
    originalUrl: document.originalUrl
  }: null
}

const shortUrlServiceFactory = ({
  shortUrlModel,
  hashingService,
  baseUrl
}: Dependencies): ShortUrlService => {
  return {
    async createShortUrl(originalUrl) {
      const shortUrl = baseUrl + hashingService.hashUrl(originalUrl).slice(0,8)
      const existingHash = await shortUrlModel.findOne({ shortUrl })
      if (existingHash) {
        throw new Error('Collision found.')
      }
      return await shortUrlModel.create({
        originalUrl,
        shortUrl
      })
      .then(documentMapper)
    },
    async listShortUrls(afterId, limit) {
      const filters = afterId
        ? { _id: { $gte: afterId }}
        : {}
      const results = await shortUrlModel.find({
        ...filters
      }, null, {
        limit: limit ? limit : 10
      })
      return results.map(documentMapper)
    },
    async getShortUrl(shortUrl: string) {
      const result = await shortUrlModel.findOne({ shortUrl })
      return documentMapper(result)
    }
  }
}

export default shortUrlServiceFactory
