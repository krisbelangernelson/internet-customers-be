import type { Request, Response } from 'express'
import * as customerService from '@/services/customerService'
import { errorResponses } from '@/utils/httpErrors/errorResponses'
import { type Error } from '@/types/error'
import type { CustomerBody, Login } from '@/types/customer'

export const registerCustomer = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .registerCustomer(req.body as CustomerBody)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'registerCustomer'))
}

export const loginCustomer = async (req: Request, res: Response): Promise<void> => {
  await customerService
    .loginCustomer(req.body as Login)
    .then((results) => res.json(results))
    .catch((error: Error) => errorResponses(res, error, 'loginCustomer'))
}
