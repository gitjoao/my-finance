import { Request, Response } from 'express'
import { BudgetService } from "./service"

const service = new BudgetService()
export class BudgetController {

  async getCategoryBudgets(req: Request, res: Response) {
    const month = Number(req.query.month)
    const year = Number(req.query.year)

    const budgets = await service.getCategoryBudgets(month, year)
    return res.json(budgets)
  }
}