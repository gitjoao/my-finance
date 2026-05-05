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
    const transactions = await prisma.transaction.findMany()

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0)

    return {
      income,
      expense,
      balance: income - expense,
    }
  }
}