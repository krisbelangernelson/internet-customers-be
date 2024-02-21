import winston from 'winston'
import expressWinston from 'express-winston'
import config from '@/config'
import { type Handler, type Response, type Request } from 'express'

interface CustomResponse extends Response {
  responseTime?: string
}

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console(config.logging)],
  meta: false,
  msg: (req: Request, res: CustomResponse) => `${req.method} ${req.url} ${res.statusCode} ${res.responseTime} ms}`,
  ignoredRoutes: ['/version']
})

export default (): Handler => {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')

  return requestLogger
}
