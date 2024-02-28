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
  debug: boolean
  basePath: string
  email: string
  logging: LoggingType
  cors: Record<string, string | boolean>
}
