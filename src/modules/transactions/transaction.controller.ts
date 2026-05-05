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
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const { month, year } = req.query

  const summary = await service.getSummaryByMonth(
    Number(month) || currentMonth,
    Number(year) || currentYear
  )
  res.json(summary)
})

export default router