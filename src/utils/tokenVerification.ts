import jwt from 'jsonwebtoken'
import { ForbiddenError } from '@/utils/httpErrors'
import { type AccessToken } from '@/types/customer'

export const tokenVerification = (token: string): AccessToken | null => {
  if (token === undefined) {
    throw new ForbiddenError('No token provided')
  }

  if (Array.isArray(token)) {
    throw new ForbiddenError('Token must be a string, not an array')
  }

  const decoded = jwt.verify(token, String(process.env.JWT_SECRET))
  if (decoded !== undefined && typeof decoded !== 'string' && decoded.email !== undefined) {
    return decoded as AccessToken
  }
  return null
}

export default tokenVerification
