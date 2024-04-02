import type { Request, Response } from 'express'
import * as customerService from '@/services/customerService'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import type { CustomerBody, Login, CustomerExists } from '@/types/customer'
import tokenVerification from '@/utils/tokenVerification'

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
      res
        .status(200)
        .json(results)
    })
    .catch((error: Error) => errorResponses(res, error, 'loginCustomer'))
}

export const autoLoginCheck = (req: Request, res: Response): void => {
  const encodedToken = String(req.headers.authorization).split('Bearer ')[1]

  if (encodedToken !== undefined) {
    const decodedToken = tokenVerification(encodedToken)

    res.json({
      ...decodedToken,
      accessToken: encodedToken
    })
  } else {
    res.json({})
  }
}

export const logout = (_req: Request, res: Response): void => {
  res.status(200).clearCookie('accessToken').json({})
}

export const customerExists = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .customerExists(req.body as CustomerExists)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'customerExists'))
}

export const customerArea = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .customerArea(req.token)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'customerArea'))
}
