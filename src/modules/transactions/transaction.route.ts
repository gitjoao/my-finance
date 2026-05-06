import { Router } from "express"
import { TransactionController } from "./transaction.controller"
import { validate } from "../../middlewares/validate"
import { createTransactionValidation, updateTransactionValidation } from "./transaction.validation"

const router = Router()
const controller = new TransactionController()

router.post("/", validate(createTransactionValidation), controller.create)
router.get("/", controller.list)
router.put("/:id", validate(updateTransactionValidation), controller.update)
router.delete("/:id", controller.delete)
router.get("/summary", controller.summary)

export default router