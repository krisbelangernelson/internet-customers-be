/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { customerExists, customerArea } from '@/controllers/customerController'
import { verifyToken } from '@/middlewares/verify'

const router = Router()

router.post('/exists', customerExists)
router.get('/area', verifyToken.verifyToken, customerArea)

export default router
