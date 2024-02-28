import { createCustomer, getCustomerByEmail } from '@/db/queries/customer'
import type { CustomerBody, Login, LoginResponse } from '@/types/customer'
import { NotFoundError } from '@/utils/httpErrors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerCustomer = async (body: CustomerBody): Promise<{ code: string; message: string }> => {
  await createCustomer(body)
  return { code: '0', message: 'User registered successfully.' }
}

export const loginCustomer = async (body: Login): Promise<LoginResponse> => {
  console.log('body', body)
  const customer = await getCustomerByEmail(body.email)

  if (customer.length < 1) {
    throw new NotFoundError(undefined, undefined, undefined, 'No account found with that username and password')
  }

  const { id, first_name: firstName, last_name: lastName, email, phone, password } = customer[0]

  const isValid = bcrypt.compareSync(body.password, password)
  if (!isValid) {
    throw new NotFoundError(undefined, undefined, undefined, 'No account found with that email and password')
  }
  const accessToken = jwt.sign({ id: id.toString(), firstName, lastName, email }, String(process.env.JWT_SECRET), {
    expiresIn: '1 days'
  })

  return {
    code: '0',
    accessToken,
    id,
    firstName,
    lastName,
    email,
    phone
  }
}
