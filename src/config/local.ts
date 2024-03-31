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
    origin: (origin, callback) => {
      if (process.env.ALLOWED_ORIGINS !== undefined) {
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");
        if (allowedOrigins.includes(origin)) { // eslint-disable-line @typescript-eslint/no-unsafe-argument
          callback(null, true); // eslint-disable-line @typescript-eslint/no-unsafe-call
        } else {
          callback(new Error("Request from unauthorized origin"));  // eslint-disable-line @typescript-eslint/no-unsafe-call
        }
      }
    },
    credentials: true
  }
} satisfies ServerConfigType
