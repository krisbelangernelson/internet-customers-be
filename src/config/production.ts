import type { ServerConfigType } from './types'
import common from './common'

export default {
  ...common,
  basePath: '/',
  email: 'admin@domain.com',
  logging: {
    prettyPrint: false,
    level: 'info',
    stringify: false,
    humanReadableUnhandledException: false,
    json: true,
    colorize: false,
    timestamp: true
  },
  cors: {
    origin: 'https://internet-provider-ui-pearl.vercel.app',
    credentials: true
  }
} satisfies ServerConfigType
