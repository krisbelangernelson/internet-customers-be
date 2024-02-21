import { createLogger, format, transports } from 'winston'
import config from '@/config'

const logger = createLogger({
  level: config.logging.level,
  format: format.combine(
    format.errors({ stack: true }),
    format.combine(format.colorize(), format.timestamp(), format.simple())
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error', 'critical']
    })
  ],
  exceptionHandlers: [new transports.Console(config.logging)],
  exitOnError: true
})

export default logger
