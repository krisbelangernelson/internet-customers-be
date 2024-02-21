import { unauthorizedError } from '@/constants/errors'
import BaseError from './BaseError'

class UnauthorizedError extends BaseError {
  constructor(message: string, code?: string | undefined) {
    super(code ?? unauthorizedError.code, unauthorizedError.reason, unauthorizedError.status, message)
  }
}
export default UnauthorizedError
