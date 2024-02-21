import * as pool from './connection'
import logger from '@/utils/logger'
import { type Pool } from 'pg'

interface CustomPool {
  pool: Pool
  query: (text: string, params?: string[], failMsg?: string) => Promise<pool.GenericQueryResult>
}

type Callback = (dbError: Error | null) => void

let db: CustomPool

const initDb = (callback: Callback): void => {
  if (db !== undefined) {
    logger.warn('Trying to init DB again!')
    callback(null)
  }

  db = pool
  callback(null)
}

const getDb = (): CustomPool => db

export { getDb, initDb }
