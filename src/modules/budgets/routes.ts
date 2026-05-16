import { Router } from 'express'
import { BudgetController } from './controller'
import { validate } from '../../middlewares/validate'
import { getCategoryBudgetsValidate } from './validate'

const router = Router()

const controller = new BudgetController()

router.get('/summary', validate(getCategoryBudgetsValidate), controller.getCategoryBudgets)

export default router
