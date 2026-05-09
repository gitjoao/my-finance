import { Router } from 'express'
import { TransactionController } from '../transactions/controller'

const router = Router()

const controller = new TransactionController()

router.get('/summary', controller.summary)

export default router
