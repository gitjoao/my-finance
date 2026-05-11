import { Router } from 'express'

import transactionRoutes from '../modules/transactions/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import categoriesRoutes from '../modules/budgets/routes'
import budgetsRoutes from '../modules/budgets/routes'

const router = Router()

router.use('/transactions', transactionRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/categories', categoriesRoutes)
router.use('/budgets', budgetsRoutes)

export default router
