import { createHash } from 'crypto'

export function hashingFunction( str: string ): string {
  return createHash('SHA256').update(str).digest('base64url')
}
