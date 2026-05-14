import { Request, Response } from 'express'
import { ReportService } from "./service"

const service = new ReportService()
export class ReportController {

  async getExpenseCategorySummaries(req: Request, res: Response) {
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    const expenseSummaries = await service.getExpenseCategorySummaries(month, year)
    return res.json(expenseSummaries)
  }
}