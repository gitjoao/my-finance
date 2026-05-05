import { Router } from "express"
import { TransactionService } from "./transaction.service"

const router = Router()
const service = new TransactionService()

router.post("/", async (req, res) => {
  const transaction = await service.create({
    ...req.body,
    date: new Date(req.body.date),
  })
  res.json(transaction)
})

router.get("/", async (req, res) => {
  const transactions = await service.findAll()
  res.json(transactions)
})

router.get("/summary", async (req, res) => {
  const summary = await service.getSummary()
  res.json(summary)
})

export default router