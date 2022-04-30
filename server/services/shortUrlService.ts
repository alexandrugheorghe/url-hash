import ShortUrlModel from '../models/shortUrl'
import { UrlHashService } from './urlHashService'

export interface ShortUrlService {
  createShortUrl(longUrl: string): Promise<typeof ShortUrlModel>
  listShortUrls(limit: number, offset: number): Promise<Array<typeof ShortUrlModel>>
  getShortUrl(shortUrl: string): Promise<typeof ShortUrlModel>
}

const shortUrlServiceFactory = (
  shortUrlModel: typeof ShortUrlModel,
  hashingService: UrlHashService
): ShortUrlService => {
  return {
    async createShortUrl(longUrl) {
      const shortUrl = hashingService.hashUrl(longUrl).slice(0,8)
      const existingHash = await shortUrlModel.findOne({ shortUrl })
      if (existingHash) {
        throw new Error('Collision found.')
      }
      return await shortUrlModel.create({
        longUrl,
        shortUrl
      })
    },
    async listShortUrls(limit, offset) {
      const results = await shortUrlModel.find({}, null, {
        skip: offset,
        limit
      })
      return results
    },
    async getShortUrl(shortUrl: string) {
      const result = await shortUrlModel.findOne({ shortUrl })
      return result
    }
  }
}

export default shortUrlServiceFactory
