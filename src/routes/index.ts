import { Router } from 'express'

import transactionRoutes from '../modules/transactions/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import categoriesRoutes from '../modules/categories/routes'
import budgetsRoutes from '../modules/budgets/routes'
import reportsRoutes from '../modules/reports/routes'
import usersRoutes from '../modules/users/routes'

const router = Router()

router.use('/transactions', transactionRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/categories', categoriesRoutes)
router.use('/budgets', budgetsRoutes)
router.use('/reports', reportsRoutes)
router.use('/users', usersRoutes)

export default router
