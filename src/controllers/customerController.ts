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
      const { accessToken } = results
      res
        .status(200)
        .cookie('accessToken', accessToken, {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          secure: true,
          httpOnly: true,
          sameSite: 'lax'
        })
        .json(results)
    })
    .catch((error: Error) => errorResponses(res, error, 'loginCustomer'))
}

export const autoLoginCheck = (req: Request, res: Response): void => {
  const cookies = req.cookies
  const encodedToken = cookies.accessToken as string

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
