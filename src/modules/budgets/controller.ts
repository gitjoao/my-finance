import { Request, Response } from 'express'
import { BudgetService } from './service'
import { GetCategoryBudgetsDTO } from './validate'

const service = new BudgetService()
export class BudgetController {
  async getCategoryBudgets(req: Request, res: Response) {
    const { month, year } = req.query as unknown as GetCategoryBudgetsDTO

    const budgets = await service.getCategoryBudgets(month, year)
    return res.json(budgets)
  }
}
