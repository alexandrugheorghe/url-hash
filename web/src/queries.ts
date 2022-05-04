import { gql } from '@apollo/client'


const ShortUrlsQuery = gql`
    query listShortUrls($afterId: String, $limit: Int) {
        shortUrls(afterId: $afterId, limit: $limit) {
            id
            originalUrl
            shortUrl
        }
    }
  `

const ShortenUrlMutation = gql`
    mutation shortenUrl($longUrl: String!) {
      shortenUrl(longUrl: $longUrl) {
        originalUrl
        shortUrl
      }
    }
  `

export {
  ShortUrlsQuery,
  ShortenUrlMutation
}
