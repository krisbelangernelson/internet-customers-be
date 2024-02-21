import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { UnauthorizedError, ForbiddenError } from '@/utils/httpErrors'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'

export interface UserRequest extends Request {
  user: Record<string, string>
}

export const verifyToken = (req: UserRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token']

  try {
    if (token === undefined) {
      throw new ForbiddenError('No token provided')
    }

    if (Array.isArray(token)) {
      throw new ForbiddenError('Token must be a string, not be an array')
    }

    jwt.verify(token, String(process.env.SECRET), (error, decoded) => {
      if (error !== undefined) {
        throw new UnauthorizedError('Unauthorized')
      }

      if (decoded !== undefined && typeof decoded !== 'string' && decoded.id !== undefined) {
        req.user.id = decoded.id as string
      }

      next()
    })
  } catch (error) {
    errorResponses(res, error as Error, 'verifyToken')
  }
}
