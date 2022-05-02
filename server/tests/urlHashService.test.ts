import UrlHashServiceFactory from '../services/urlHashService'
import { jest } from '@jest/globals'

const hashingFunction = jest.fn((str) => 'hashed_'+str)
const urlHashService = UrlHashServiceFactory(hashingFunction)

it('calls the hashing function with correct string', () => {
  const url = 'blabla'
  urlHashService.hashUrl(url)
  expect(hashingFunction.mock.calls.length).toBe(1)
  expect(hashingFunction.mock.calls[0][0]).toBe(url)
})

it('returns the correct string', () => {
  const url = 'correct'
  const hashedResult = urlHashService.hashUrl(url)
  expect(hashedResult).toBe('hashed_correct')
})
