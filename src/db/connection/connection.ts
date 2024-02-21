import { Pool, type QueryResult } from 'pg'
import logger from '@/utils/logger'
import { host, user, password, database, port } from './config'
import { dbError } from '@/constants/errors'
import { InternalError, ConflictError } from '@/utils/httpErrors'
import { type Customer } from '@/types/customer'

export interface GenericQueryResult extends QueryResult {
  rows: Customer[]
}

const pool = new Pool({
  database,
  user,
  password,
  host,
  port,
  ssl: false,
  max: 20,
  connectionTimeoutMillis: 10000
})

// possible fix for 'Connection terminated unexpectedly'
// https://github.com/brianc/node-postgres/issues/2439
pool.on('connect', (client) => {
  client.on('error', (error) => {
    logger.error('Unexpected database error on client (likely idle client error)')
    logger.error(error)
  })
})

// possible fix for 'Connection terminated unexpectedly'
// https://github.com/brianc/node-postgres/issues/1611#issuecomment-558566873
// on('connect)' listener is probably all that's needed?
pool.on('error', (error) => {
  logger.error('Unexpected database error on pool (likely idle client error)')
  logger.error(error)
})

const query = async (text: string, params?: string[], failMsg?: string): Promise<GenericQueryResult> =>
  await pool.query(text, params).catch((error: Error) => {
    if (String(error).includes('duplicate key')) {
      const errorObj = {
        message: error.message,
        // detail: error.detail,
        stack: error.stack
      }

      logger.info(JSON.stringify(errorObj))

      throw new ConflictError(undefined, undefined, undefined, errorObj.message)
    }

    logger.error(failMsg)
    logger.error(`Query SQL: ${text}`)
    logger.error(`Query values: ${JSON.stringify(params)}`)
    logger.info(JSON.stringify(error))

    throw new InternalError(error, dbError.code, dbError.msg)
  })

export { pool, query }
