import { Request, Response } from "express"
import { TransactionService } from "./transaction.service"

const service = new TransactionService()

export class TransactionController {
  async create(req: Request, res: Response) {

    const data = req.body

    const result = await service.create({ ...data, date: new Date(data.date) })
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

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      await service.delete(String(id))
    } catch {
      return res.status(404).json({ message: "Transação não encontrada" })
    }
    res.status(204).send()
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body

    try {
      const result = await service.update(String(id), data)
      res.json(result)
    } catch {
      return res.status(404).json({ message: "Transação não encontrada" })
    }
  }
}