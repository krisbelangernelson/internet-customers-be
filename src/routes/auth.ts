/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { registerCustomer, loginCustomer, autoLoginCheck } from '@/controllers/customerController'
import { verifyRegistration } from '@/middlewares/verify'

const router = Router()

// router.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, x-access-token, Origin, Content-Type, Accept')
//   next()
// })

router.post('/register', verifyRegistration.verifyBody, verifyRegistration.verifyEmailNotExist, registerCustomer)
router.post('/login', loginCustomer)
router.get('/auto-login-check', autoLoginCheck)

export default router
