// import { CorsOptions, CorsOptionsDelegate } from "cors"
// import { Request } from "express"

interface LoggingType {
  prettyPrint: boolean
  level: string
  stringify: boolean
  humanReadableUnhandledException: boolean
  json: boolean
  colorize: boolean
  timestamp: boolean
}

export interface ServerConfigType {
  port: number
  basePath: string
  email: string
  logging: LoggingType
  cors: {
    origin: string
  }
}
