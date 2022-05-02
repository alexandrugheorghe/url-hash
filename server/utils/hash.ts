import { createHash } from 'crypto'

export function hashFunction( str: string ): string {
  return createHash('SHA256').update(str).digest('base64url')
}
