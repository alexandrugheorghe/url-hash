export interface UrlHashService {
  hashUrl(longUrl: string): string
}

const urlHashServiceFactory = (hashingFunction: (str: string) => string): UrlHashService => {
  return {
    hashUrl(longUrl: string): string {
      return hashingFunction(longUrl)
    }
  }
}

export default urlHashServiceFactory
