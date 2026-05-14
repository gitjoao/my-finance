import { Router } from 'express'
import { ReportController } from './controller'

const router = Router()

const controller = new ReportController()

router.get('/expenses-by-category', controller.getExpenseCategorySummaries)

export default router
