import { Router } from 'express'
import { ReportController } from './controller'
import { validate } from '../../middlewares/validate'
import { getAllTransactionsByPeriodValidation, getExpenseCategorySummariesValidation } from './validate'

const router = Router()

const controller = new ReportController()

router.get('/expenses-by-category', validate(getExpenseCategorySummariesValidation), controller.getExpenseCategorySummaries)
router.get('/transactions-by-period', validate(getAllTransactionsByPeriodValidation), controller.getAllTransactionsByPeriod)

export default router
