import type { Request, Response, NextFunction } from 'express'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import tokenVerification from '@/utils/tokenVerification'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = String(req.headers.authorization).split('Bearer ')[1]

    const decodedToken = tokenVerification(token)

    if (decodedToken != null) {
      req.token = decodedToken
    }

    next()
  } catch (error) {
    errorResponses(res, error as Error, 'verifyToken')
  }
}
