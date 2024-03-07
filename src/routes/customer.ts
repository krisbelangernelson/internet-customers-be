/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { customerExists, customerArea } from '@/controllers/customerController'
import { verifyToken } from '@/middlewares/verify'

const router = Router()

router.post('/customer-exists', customerExists)
router.get('/customer-area', verifyToken.verifyToken, customerArea)

export default router
