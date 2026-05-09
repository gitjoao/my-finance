import { Router } from 'express'

import transactionRoutes from '../modules/transactions/routes'
import dashboardRoutes from '../modules/dashboard/routes'
import categoriesRoutes from '../modules/categories/routes'

const router = Router()

router.use('/transactions', transactionRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/categories', categoriesRoutes)

export default router
