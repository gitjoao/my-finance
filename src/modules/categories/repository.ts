import { prisma } from '../../lib/prisma'

export class CategoryRepository {
  findAll(type?: 'income' | 'expense') {
    const where: any = {}
    if (type) {
      where.type = type
    }
    return prisma.category.findMany({ where, orderBy: { name: 'asc' } })
  }
}
