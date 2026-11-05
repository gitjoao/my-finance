import { Router } from 'express'

import transactionRoutes from '../modules/transactions/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import categoriesRoutes from '../modules/categories/routes'
import budgetsRoutes from '../modules/budgets/routes'
import reportsRoutes from '../modules/reports/routes'
import usersRoutes from '../modules/users/routes'
import authRoutes from '../modules/auth/routes'
import { auth } from '../middlewares/auth'

const router = Router()

router.use('/transactions', auth, transactionRoutes)
router.use('/dashboard', auth, dashboardRoutes)
router.use('/categories', auth, categoriesRoutes)
router.use('/budgets', auth, budgetsRoutes)
router.use('/reports', auth, reportsRoutes)
router.use('/users', auth, usersRoutes)
router.use('/auth', authRoutes)

export default router
