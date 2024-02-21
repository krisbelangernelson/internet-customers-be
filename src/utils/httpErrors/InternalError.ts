import BaseError from './BaseError'
import { internalError } from '@/constants/errors'

class InternalError extends BaseError {
  internalError: object | string

  constructor(error: Error, code = internalError.code, message = internalError.msg) {
    super(code, internalError.reason, internalError.status, message)
    this.internalError = error
  }
}

export default InternalError
