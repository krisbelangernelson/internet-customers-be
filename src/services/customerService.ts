import { createCustomer, getCustomerByEmail, getCustomerByPhone, getCustomerById } from '@/db/queries/customer'
import type { CustomerBody, Login, LoginResponse, CustomerExists, AccessToken } from '@/types/customer'
import { NotFoundError, InternalError } from '@/utils/httpErrors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerCustomer = async (body: CustomerBody): Promise<{ id: string }> => {
  const created = await createCustomer(body)
  return { id: created.id.toString() }
}

export const loginCustomer = async (body: Login): Promise<LoginResponse> => {
  const customer = await getCustomerByEmail(body.email)

  if (customer.length < 1) {
    throw new NotFoundError(undefined, undefined, undefined, 'No account found with that username and password')
  }

  const { id, first_name: firstName, last_name: lastName, email, phone, password } = customer[0]

  const isValid = bcrypt.compareSync(body.password, password)
  if (!isValid) {
    throw new NotFoundError(undefined, undefined, undefined, 'No account found with that email and password')
  }
  const accessToken = jwt.sign(
    { id: id.toString(), firstName, lastName, email, phone },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d'
    }
  )

  return {
    accessToken,
    id,
    firstName,
    lastName,
    email,
    phone
  }
}

export const customerExists = async (body: CustomerExists): Promise<{ emailExists: boolean; phoneExists: boolean }> => {
  const { email, phone } = body
  const emailExists = await getCustomerByEmail(email)
  const phoneExists = await getCustomerByPhone(phone)
  return { emailExists: emailExists.length > 0, phoneExists: phoneExists.length > 0 }
}

export const customerArea = async (token: AccessToken | undefined): Promise<CustomerBody> => {
  if (token === undefined) {
    throw new InternalError(undefined, undefined, 'Request.token is undefined')
  }

  const user = await getCustomerById(token.id)
  const { id, first_name: firstName, last_name: lastName, email, phone } = user[0]

  // const order = await axios.get

  return {
    id: id.toString(),
    firstName,
    lastName,
    email,
    phone
  }
}
