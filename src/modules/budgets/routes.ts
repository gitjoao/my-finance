import { Router } from 'express'
import { BudgetController } from './controller'

const router = Router()

const controller = new BudgetController()

router.get('/summary', controller.getCategoryBudgets)

export default router
