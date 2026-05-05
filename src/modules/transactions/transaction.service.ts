import { prisma } from "../../lib/prisma"

export class TransactionService {
  async create(data: {
    type: string
    amount: number
    category: string
    description?: string
    date: Date
  }) {
    return prisma.transaction.create({ data })
  }

  async findAll() {
    return prisma.transaction.findMany({
      orderBy: { date: "desc" },
    })
  }

  async getSummary() {
    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: "income" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { type: "expense" },
        _sum: { amount: true },
      }),
    ])

    const totalIncome = income._sum.amount || 0
    const totalExpense = expense._sum.amount || 0

    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    }
  }

  async getSummaryByMonth(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const [income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          type: "income",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          type: "expense",
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: { amount: true },
      }),
    ])

    const totalIncome = income._sum.amount || 0
    const totalExpense = expense._sum.amount || 0

    return {
      income: totalIncome,
      expense: totalExpense,
      balance: totalIncome - totalExpense,
    }
  }
}