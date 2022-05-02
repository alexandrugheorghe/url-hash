export interface UrlHashService {
  hashUrl(longUrl: string): string
}

const urlHashServiceFactory = (hashFunction: (str: string) => string): UrlHashService => {
  return {
    hashUrl(longUrl: string): string {
      return hashFunction(longUrl)
    }
  }
}

export default urlHashServiceFactory
