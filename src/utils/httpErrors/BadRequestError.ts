import { badRequestError } from '@/constants/errors'
import BaseError from './BaseError'

class BadRequestError extends BaseError {
  constructor(param: string | undefined, value: string | undefined, code?: string | undefined, message?: string) {
    super(
      code ?? badRequestError.code,
      badRequestError.reason,
      badRequestError.status,
      message ?? `Unable to process request for '${param}' [${value}].`
    )
  }
}

export default BadRequestError
