import { Request, Response } from 'express'
import { ReportService } from './service'
import { GetExpenseCategorySummariesDTO } from './validate'

const service = new ReportService()
export class ReportController {
  async getExpenseCategorySummaries(req: Request, res: Response) {
    const { month, year } =
      req.query as unknown as GetExpenseCategorySummariesDTO

    const expenseSummaries = await service.getExpenseCategorySummaries(
      month,
      year,
    )
    return res.json(expenseSummaries)
  }

  async getAllTransactionsByPeriod(req: Request, res: Response) {
    const { startMonth, startYear, endMonth, endYear } =
      req.query as unknown as {
        startMonth: number
        startYear: number
        endMonth: number
        endYear: number
      }
    const transactions = await service.getAllTransactionsByPeriod(
      startMonth,
      startYear,
      endMonth,
      endYear,
    )
    return res.json(transactions)
  }
}
