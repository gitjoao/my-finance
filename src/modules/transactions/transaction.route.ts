import { Router } from "express"
import { TransactionController } from "./transaction.controller"
import { validate } from "../../middlewares/validate"
import { createTransactionSchema } from "./transaction.schema"

const router = Router()
const controller = new TransactionController()

router.post("/", validate(createTransactionSchema), controller.create)
router.get("/", controller.list)
router.get("/summary", controller.summary)

export default router