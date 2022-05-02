import { jest } from '@jest/globals'
import shortUrlModel from '../models/shortUrl'
import ShortUrlServiceFactory from '../services/shortUrlService'
import { UrlHashService } from '../services/urlHashService'
import shortUrl from '../models/shortUrl'

jest.mock('../models/shortUrl', () => ({
  create: jest.fn(async () => {
    return {
      _id: 'dummyId',
      originalUrl: 'dummyOriginalUrl',
      shortUrl: 'dummyShortUrl'+Math.random()
    }
  }),
  find: jest.fn(async () => {
    return [{
      _id: 'dummyId',
      originalUrl: 'dummyOriginalUrl',
      shortUrl: 'dummyShortUrl'+Math.random()
    }]
  }),
  findOne: jest.fn(() => {
    return null
  })
}))
const hashServiceFactory = jest.fn((): UrlHashService => {
  return {
    hashUrl(str: string) {
      return 'hash' + str
    }
  }
})
const shortUrlService = ShortUrlServiceFactory({
  shortUrlModel,
  hashingService: hashServiceFactory(),
  baseUrl: 'http://dummy.com/'
})

it('executes the createShortUrl method correctly', async () => {
  await shortUrlService.createShortUrl('longUrl')
  expect(shortUrlModel.create).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.create).toHaveBeenCalledWith({ originalUrl: 'longUrl', shortUrl: 'http://dummy.com/hashlong' })
})

it('executes the listShortUrls method correctly', async () => {
  await shortUrlService.listShortUrls()
  expect(shortUrlModel.find).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.find).toHaveBeenCalledWith({}, null, { limit: 10})
})

it('executes the listShortUrls method correctly with afterId', async () => {
  await shortUrlService.listShortUrls('dummyId')
  expect(shortUrlModel.find).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.find).toHaveBeenCalledWith({ _id: {$gte: 'dummyId' }}, null, { limit: 10})
})

it('executes the getShortUrl method correctly', async () => {
  await shortUrlService.getShortUrl('shortUrl')
  expect(shortUrlModel.findOne).toHaveBeenCalledTimes(1)
  expect(shortUrlModel.findOne).toHaveBeenCalledWith({ shortUrl: 'shortUrl' })
})
