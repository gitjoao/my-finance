import { Request, Response } from 'express'
import { CategoryService } from './service'
const service = new CategoryService()

export class CategoryController {
  async list(req: Request, res: Response) {
    const type = req.query.type as 'income' | 'expense' | undefined
    const categories = await service.list(type)
    return res.json(categories)
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id
    const category = await service.getById(String(id))
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(category)
  }

  async create(req: Request, res: Response) {
    const data = req.body
    const category = await service.create(data)
    return res.status(201).json(category)
  }

  async update(req: Request, res: Response) {
    const id = req.params.id
    const data = req.body
    const category = await service.update(String(id), data)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(category)
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    const success = await service.delete(String(id))
    if (!success) {
      return res.status(404).json({ message: 'Category not found' })
    }
    return res.status(204).send()
  }
}
