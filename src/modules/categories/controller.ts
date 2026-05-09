import { Request, Response } from 'express'
import { CategoryService } from './service'
const service = new CategoryService()

export class CategoryController {
  async list(req: Request, res: Response) {
    const type = req.query.type as 'income' | 'expense' | undefined
    const categories = await service.list(type)
    return res.json(categories)
  }
}
