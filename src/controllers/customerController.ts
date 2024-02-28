import type { Request, Response } from 'express'
import * as customerService from '@/services/customerService'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import type { CustomerBody, Login, EmailExists } from '@/types/customer'

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .registerCustomer(req.body as CustomerBody)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'registerCustomer'))
}

export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .loginCustomer(req.body as Login)
    .then((results) => {
      const { accessToken } = results
      res
        .status(200)
        .cookie('accessToken', accessToken, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          secure: true,
          httpOnly: true
        })
        .json(results)
    })
    .catch((error: Error) => errorResponses(res, error, 'loginCustomer'))
}

export const emailExists = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .emailExists(req.body as EmailExists)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'emailExists'))
}
