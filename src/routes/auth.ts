/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { registerCustomer, loginCustomer, customerExists } from '@/controllers/customerController'
import { verifyRegistration } from '@/middlewares/verify'

const router = Router()

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.post('/register', verifyRegistration.verifyBody, verifyRegistration.verifyEmailNotExist, registerCustomer)
router.post('/login', loginCustomer)
router.post('/customer-exists', customerExists)
// TODO: add protected route for jwt token verification

export default router
