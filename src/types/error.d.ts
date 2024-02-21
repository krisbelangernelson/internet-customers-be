export interface Error {
  code: string
  message: string
  reason: string
  stack?: string
  status?: number
  internalError?: Error
}
