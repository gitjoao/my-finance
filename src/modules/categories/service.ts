import { CategoryRepository } from './repository'

export class CategoryService {
  private repository = new CategoryRepository()
  async list(type?: 'income' | 'expense') {
    return this.repository.findAll(type)
  }
}
