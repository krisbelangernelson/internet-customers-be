import logger from '../logger'
import { internalError, httpStatus } from '@/constants/errors'
import { type Response } from 'express'
import { type Error } from '@/types/error'

const appAbbr = 'customer-api'

const errorResponses = (res: Response, data: Error, label: string): Response => {
  // In case an error not intentionally created by developer
  if (data.code === undefined) {
    const errorObj = {
      code: internalError.code,
      reason: internalError.reason,
      message: internalError.msg,
      status: httpStatus.INTERNAL_SERVER
    }

    logger.error(`${appAbbr}/${label}/data: ${JSON.stringify(data)}`)
    logger.error(`${appAbbr}/${label}/stack: ${JSON.stringify(data.stack)}`)
    logger.error(`${appAbbr}/${label}: ${JSON.stringify(errorObj)}`)

    return res.status(httpStatus.INTERNAL_SERVER).send(errorObj)
  }

  const status = data?.status ?? httpStatus.INTERNAL_SERVER

  // Create error obj for response with only wanted data
  const errorObj = {
    code: data.code,
    reason: data.reason,
    message: data.message,
    status
  }

  // Only send stderr for status 500, everything else is stdout
  if (status >= httpStatus.BAD_REQUEST && status < httpStatus.INTERNAL_SERVER) {
    logger.info(`${appAbbr}/${label}: ${JSON.stringify(errorObj)}`)
    logger.info(`${appAbbr}/${label}/stack: ${JSON.stringify(data.stack)}`)
  } else if (status >= httpStatus.INTERNAL_SERVER) {
    logger.error(`${appAbbr}/${label}: ${JSON.stringify(errorObj)}`)
    logger.error(`${appAbbr}/${label}/internalError: ${data?.internalError?.message}`)
    logger.error(`${appAbbr}/${label}/stack: ${JSON.stringify(data.stack)}`)
  }

  return res.status(status).send(errorObj)
}

export { errorResponses, httpStatus }
