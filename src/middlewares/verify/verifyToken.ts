import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedError, ForbiddenError } from '@/utils/httpErrors'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import { type AccessToken } from '@/types/customer'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // const token = req.headers['x-access-token']
  const cookies = req.cookies
  const token = cookies.accessToken as string

  try {
    if (token === undefined) {
      throw new ForbiddenError('No token provided')
    }

    if (Array.isArray(token)) {
      throw new ForbiddenError('Token must be a string, not an array')
    }

    jwt.verify(token, String(process.env.JWT_SECRET), (error, decoded) => {
      if (error !== null) {
        throw new UnauthorizedError('Unauthorized')
      }

      if (decoded !== undefined && typeof decoded !== 'string' && decoded.email !== undefined) {
        req.token = decoded as AccessToken
      }

      next()
    })
  } catch (error) {
    errorResponses(res, error as Error, 'verifyToken')
  }
}
