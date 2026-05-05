import { Request, Response } from "express"
import { TransactionService } from "./transaction.service"

const service = new TransactionService()

export class TransactionController {
  async create(req: Request, res: Response) {
    const result = await service.create(req.body)
    res.json(result)
  }

  async summary(req: Request, res: Response) {
    const { month, year } = req.query
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const result = await service.getSummaryByMonth(
      Number(month) || currentMonth,
      Number(year) || currentYear
    )

    res.json(result)
  }

  async list(req: Request, res: Response) {
    const transactions = await service.findAll()
    res.json(transactions)
  }
}