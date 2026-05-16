import { Request, Response } from 'express'
import { ReportService } from "./service"
import { GetExpenseCategorySummariesDTO } from './validate';

const service = new ReportService()
export class ReportController {

  async getExpenseCategorySummaries(req: Request, res: Response) {
    const { month, year } = req.query as unknown as GetExpenseCategorySummariesDTO;

    const expenseSummaries = await service.getExpenseCategorySummaries(month, year)
    return res.json(expenseSummaries)
  }
}