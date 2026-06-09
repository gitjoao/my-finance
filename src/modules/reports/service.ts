import { CategoryRepository } from '../categories/repository'
import { TransactionRepository } from '../transactions/repository'

interface ExpenseCategorySummary {
  category: string
  amount: number
  color: string
}

export class ReportService {
  private transactionRepository = new TransactionRepository()
  private categoryRepository = new CategoryRepository()

  async getExpenseCategorySummaries(
    month: number,
    year: number,
  ): Promise<ExpenseCategorySummary[]> {
    const transactions = await this.transactionRepository.getSummaryByCategory(
      month,
      year,
    )
    const categories = await this.categoryRepository.findAll()

    const expenseSummaries = transactions.map((transaction) => {
      const category = categories.find((c) => c.id === transaction.categoryId)

      return {
        category: category ? category.name : 'Unknown',
        amount: transaction._sum.amount || 0,
        color: category ? category.color : '#ccc',
      } as ExpenseCategorySummary
    })

    return expenseSummaries
  }

  async getAllTransactionsByPeriod(
    startMonth: number,
    startYear: number,
    endMonth: number,
    endYear: number,
  ) {
    const startDate = new Date(Date.UTC(startYear, startMonth - 1, 1))

    const endDate = new Date(Date.UTC(endYear, endMonth, 1))
    const transactions =
      await this.transactionRepository.getAllTransactionsByPeriod(
        startDate,
        endDate,
      )

    const result = new Map()

    for (const transaction of transactions) {
      const category = transaction.category?.name ?? 'Sem categoria'
      const color = transaction.category?.color ?? '#ccc'
      const month = `${transaction.date.getUTCFullYear()}-${String(
        transaction.date.getUTCMonth() + 1,
      ).padStart(2, '0')}`

      if (!result.has(category)) {
        result.set(category, {
          category,
          color,
          total: 0,
          months: {},
        })
      }

      const item = result.get(category)

      item.total += transaction.amount

      item.months[month] = (item.months[month] ?? 0) + transaction.amount
    }

    return [...result.values()]
  }
}
