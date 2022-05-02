import dbConnector from '../utils/dbConnector'

const { Schema } = dbConnector
const shortUrl = dbConnector.model('shortUrl', new Schema({
  originalUrl: String,
  shortUrl: String
}))

export default shortUrl
