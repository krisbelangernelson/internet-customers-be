import type { Request, Response, NextFunction } from 'express'
import { ConflictError, BadRequestError } from '@/utils/httpErrors'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import { getCustomerByEmail } from '@/db/queries/customer'
import { type CustomerBody } from '@/types/customer'

export const verifyEmailNotExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body as CustomerBody

    const customerExists = await getCustomerByEmail(email)

    if (customerExists.length > 0) {
      throw new ConflictError('email', email)
    } else {
      next()
    }
  } catch (error) {
    errorResponses(res, error as Error, 'verifyEmailNotExist')
  }
}

export const verifyBody = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { firstName, lastName, email, password, phone } = req.body as CustomerBody

    if (firstName === undefined) {
      throw new BadRequestError('firstName', firstName)
    } else if (lastName === undefined) {
      throw new BadRequestError('lastName', lastName)
    } else if (email === undefined) {
      throw new BadRequestError('email', email)
    } else if (password === undefined) {
      throw new BadRequestError('password', password)
    } else if (phone === undefined) {
      throw new BadRequestError('phone', phone)
    } else {
      next()
    }
  } catch (error) {
    errorResponses(res, error as Error, 'verifyBody')
  }
}
