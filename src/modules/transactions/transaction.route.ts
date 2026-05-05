import { Router } from "express"
import { TransactionController } from "./transaction.controller"

const router = Router()
const controller = new TransactionController()

router.post("/", controller.create)
router.get("/", controller.list)
router.get("/summary", controller.summary)

export default router