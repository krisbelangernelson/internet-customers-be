import { getDb } from '@/db/connection'
import type { Customer, CustomerBody } from '@/types/customer'
import bcrypt from 'bcrypt'

const saltRounds = 8

export const getCustomerByEmail = async (email): Promise<Customer[]> => {
  const db = getDb()

  const select = 'SELECT * FROM internet_customer WHERE email = $1 LIMIT 1'

  const result = await db.query(select, [email])

  return await Promise.resolve(result.rows)
}

export const getCustomerByPhone = async (phone): Promise<Customer[]> => {
  const db = getDb()

  const select = 'SELECT * FROM internet_customer WHERE phone = $1 LIMIT 1'

  const result = await db.query(select, [phone])

  return await Promise.resolve(result.rows)
}

export const createCustomer = async (params: CustomerBody): Promise<void> => {
  const { firstName, lastName, email, password, phone } = params
  const db = getDb()

  const sql = `INSERT INTO internet_customer(
      first_name,
      last_name,
      email,
      password,
      phone
    )
    VALUES ($1, $2, $3, $4, $5) RETURNING id`

  const values = [firstName, lastName, email, await bcrypt.hash(password, saltRounds), phone]

  await db.query(sql, values, `createCustomer: DB error inserting customer.`)
}
