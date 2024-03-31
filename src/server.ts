/* eslint-disable import/first */
require('dotenv-override').config({ override: true }) // eslint-disable-line
require('express-async-errors')
import './utils/module-alias'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import { stringifyInspect } from '@/utils/utils'
import requestLogger from '@/middlewares/requestLogger'
import errorLogger from '@/middlewares/errorLogger'
import logger from '@/utils/logger'
import errorHandler from '@/middlewares/errorHandler'
import { initDb } from '@/db/connection'
import routes from '@/routes'
import { internalError } from '@/constants/errors'
import config from './config'

const app = express()

if (process.env.JWT_SECRET === undefined) {
  logger.error('Missing JWT_SECRET env var')
}

// @ts-expect-error type issues with cors whitelisting
app.use(cors(config.cors))
app.use(compression())
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(requestLogger())
app.use(config.basePath, routes)
app.use(errorLogger(logger))
app.use(errorHandler)

initDb((dbError: Error | null) => {
  if (dbError !== null) logger.error(`Failed to create database pool: ${JSON.stringify(dbError)}`)

  app
    .listen(config.port, () => {
      logger.info(`Started ${process.env.NODE_ENV} mode on port ${config.port}`)
    })
    .on('error', (appError) => {
      logger.error(`Failed to start app on port ${config.port}: ${JSON.stringify(appError)}`)
    })
})

process.on('uncaughtException', () => {
  // Already logged the error in winston logger
  process.exit(1)
})

process.on('unhandledRejection', (reason: string, promise) => {
  logger.error(
    JSON.stringify({
      code: internalError.code,
      reason: internalError.reason,
      message: `Unhandled Rejection at: ${stringifyInspect(promise)}, Reason: ${reason}`
    })
  )
})

process.on('SIGINT', () => {
  logger.info('Server shutting down')
  process.exit()
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM shutting down')
  process.exit(0)
})

export default app
