import { prisma } from '../../lib/prisma'

type Filters = {
  type?: 'income' | 'expense'
  month?: number
  year?: number
  paymentMethod?: 'credit' | 'debit'
  categoryId?: string
}

export class TransactionRepository {
  create(data: any) {
    return prisma.transaction.create({ data })
  }

  findAll(filters: Filters) {
    const where: any = {}

    if (filters.type) {
      where.type = filters.type
    }

    if (filters.month && filters.year) {
      const start = new Date(Date.UTC(filters.year, filters.month - 1, 1))

      const end = new Date(Date.UTC(filters.year, filters.month, 1))

      where.date = {
        gte: start,
        lt: end,
      }
    }

    if (filters.paymentMethod) {
      where.paymentMethod = filters.paymentMethod
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId
    }

    return prisma.transaction.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
      include: {
        category: true,
      }
    })
  }

  getSummaryByMonth(start: Date, end: Date) {
    const periodFilter = {
      date: {
        gte: start,
        lt: end,
      },
    }
    return Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'income', ...periodFilter },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'expense', owner: 'me', ...periodFilter },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          type: 'expense',
          owner: 'me',
          paymentMethod: 'credit',
          ...periodFilter,
        },
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          type: 'expense',
          owner: 'father_in_law',
          paymentMethod: 'credit',
          ...periodFilter,
        },
      }),
      prisma.transaction.findMany({
        where: { type: 'expense', ...periodFilter },
        orderBy: { date: 'asc' },
      }),
    ])
  }

  findById(id: string) {
    return prisma.transaction.findUnique({ where: { id } })
  }

  update(id: string, data: Partial<any>) {
    return prisma.transaction.update({ where: { id }, data })
  }

  delete(id: string) {
    return prisma.transaction.delete({ where: { id } })
  }

  createMany(data: any[]) {
    return prisma.transaction.createMany({
      data,
    })
  }
}
