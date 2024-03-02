import { type AccessToken } from '../../src/types/customer'

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, string>
      token?: AccessToken
    }
  }
}
