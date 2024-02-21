class BaseError extends Error {
  code: string
  reason: string
  status: number
  message: string

  constructor(code: string, reason: string, status: number, message: string) {
    super(message)
    this.code = code
    this.reason = reason
    this.status = status
    this.message = message
  }
}

export default BaseError
