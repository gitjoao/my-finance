import { Router } from "express"
import { TransactionController } from "./transaction.controller"
import { validate } from "../../middlewares/validate"
import { createTransactionValidation, updateTransactionValidation } from "./transaction.validation"

const router = Router()
const controller = new TransactionController()

router.post("/", validate(createTransactionValidation), controller.create)

router.get("/summary", controller.summary)

router.get("/", controller.list)

router.get("/:id", controller.findById)

router.put("/:id", validate(updateTransactionValidation), controller.update)

router.delete("/:id", controller.delete)

export default router