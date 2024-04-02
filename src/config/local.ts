import type { ServerConfigType } from './types'
import common from './common'

export default {
  ...common,
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
    origin: '*',
  }
} satisfies ServerConfigType
