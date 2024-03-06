import type { Request, Response, NextFunction } from 'express'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import tokenVerification from '@/utils/tokenVerification'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // const token = req.headers['x-access-token']
  const cookies = req.cookies
  const token = cookies.accessToken as string

  try {
    const decodedToken = tokenVerification(token)

    if (decodedToken != null) {
      req.token = decodedToken
    }

    next()
  } catch (error) {
    errorResponses(res, error as Error, 'verifyToken')
  }
}
