import { type Request, type Response, type NextFunction } from 'express'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'

export default () =>
  (err: Error, _req: Request, res: Response, next: NextFunction): void => {
    errorResponses(res, err, 'errorHandler')
    next()
  }
