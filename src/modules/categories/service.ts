import { CategoryRepository } from './repository'

export class CategoryService {
  private repository = new CategoryRepository()
  async list(type?: 'income' | 'expense') {
    return this.repository.findAll(type)
  }

  async getById(id: string) {
    return this.repository.findById(id)
  }

  async create(data: { name: string; type: 'income' | 'expense'; color: string; limit?: number }) {
    return this.repository.create(data)
  }

  async update(id: string, data: { name?: string; type?: 'income' | 'expense'; color?: string; limit?: number }) {
    return this.repository.update(id, data)
  }

  async delete(id: string) {
    return this.repository.delete(id)
  }
}
