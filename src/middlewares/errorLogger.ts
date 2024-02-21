import expressWinston from 'express-winston'
import { type ErrorRequestHandler } from 'express'
import { type Logger } from 'winston'

export default (logger: Logger): ErrorRequestHandler => expressWinston.errorLogger({ winstonInstance: logger })
