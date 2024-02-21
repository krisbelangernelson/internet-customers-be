import { forbiddenError } from '@/constants/errors'
import BaseError from './BaseError'

class ForbiddenError extends BaseError {
  constructor(message: string, code?: string | undefined) {
    super(code ?? forbiddenError.code, forbiddenError.reason, forbiddenError.status, message)
  }
}
export default ForbiddenError
