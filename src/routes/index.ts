import { Router } from "express"

import transactionRoutes from "../modules/transactions/routes"
import dashboardRoutes from "../modules/dashboard/routes"

const router = Router()

router.use("/transactions", transactionRoutes)
router.use("/dashboard", dashboardRoutes)

export default router