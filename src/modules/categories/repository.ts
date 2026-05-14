import { prisma } from '../../lib/prisma'

export class CategoryRepository {
  findAll(type?: 'income' | 'expense') {
    const where: any = {}
    if (type) {
      where.type = type
    }
    return prisma.category.findMany({ where, orderBy: { name: 'asc' } })
  }

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } })
  }

  create(data: { name: string; type: 'income' | 'expense'; slug: string; limit?: number }) {
    return prisma.category.create({ data })
  }

  update(id: string, data: { name?: string; type?: 'income' | 'expense'; limit?: number }) {
    return prisma.category.update({ where: { id }, data })
  }

  async delete(id: string) {
    try {
      await prisma.category.delete({ where: { id } })
      return true
    } catch (error) {
      return false
    }
  }

  findAllWithLimit() {
    return prisma.category.findMany({
      where: {
        AND: [
          {
            limit: {
              not: null,
            },
          },
          {
            limit: {
              not: 0,
            },
          },
        ],
      },
    })

  }
}
