import { Router } from 'express'
import { ReportController } from './controller'
import { validate } from '../../middlewares/validate'
import { getExpenseCategorySummariesValidation } from './validate'

const router = Router()

const controller = new ReportController()

router.get('/expenses-by-category', validate(getExpenseCategorySummariesValidation), controller.getExpenseCategorySummaries)

export default router
