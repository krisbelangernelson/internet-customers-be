import type { ServerConfigType } from './types'
import common from './common'

export default {
  ...common,
  debug: true,
  basePath: '/',
  email: 'admin@domain.com',
  logging: {
    prettyPrint: true,
    level: 'debug',
    stringify: false,
    humanReadableUnhandledException: true,
    json: true,
    colorize: true,
    timestamp: true
  },
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  }
} satisfies ServerConfigType
