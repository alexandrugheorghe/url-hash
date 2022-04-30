import { jest } from '@jest/globals'
import shortUrlModel from '../models/shortUrl'
import ShortUrlServiceFactory from '../services/shortUrlService'
import { UrlHashService } from '../services/urlHashService'
import shortUrl from '../models/shortUrl'

jest.mock('../models/shortUrl')
const urlHashServiceFactory = jest.fn((): UrlHashService => {
  return {
    hashUrl(str: string) {
      return 'hash' + str
    }
  }
})
const shortUrlService = ShortUrlServiceFactory(shortUrlModel, urlHashServiceFactory())

test('executes the createShortUrl method correctly', async () => {
  await shortUrlService.createShortUrl('longUrl')
  expect(shortUrlModel.create).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.create).toHaveBeenCalledWith({ longUrl: 'longUrl', shortUrl: 'hashlong' })
})

test('executes the listShortUrls method correctly', async () => {
  await shortUrlService.listShortUrls(10, 0)
  expect(shortUrlModel.find).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.find).toHaveBeenCalledWith({}, null, { skip: 0, limit: 10})
})

test('executes the getShortUrl method correctly', async () => {
  await shortUrlService.getShortUrl('shortUrl')
  expect(shortUrlModel.findOne).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.findOne).toHaveBeenCalledWith({ shortUrl: 'shortUrl' })
})
