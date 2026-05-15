import { CategoryRepository } from "../categories/repository"
import { TransactionRepository } from "../transactions/repository"

interface ExpenseCategorySummary {
  category: string,
  amount: number,
  color: string
}


export class ReportService {
  private transactionRepository = new TransactionRepository()
  private categoryRepository = new CategoryRepository()

  async getExpenseCategorySummaries(month: number, year: number): Promise<ExpenseCategorySummary[]> {

    const transactions = await this.transactionRepository.getSummaryByCategory(month, year)
    const categories = await this.categoryRepository.findAll()

    const expenseSummaries = transactions.map(transaction => {
      const category = categories.find(c => c.id === transaction.categoryId)

      return {
        category: category ? category.name : 'Unknown',
        amount: transaction._sum.amount || 0,
        color: category ? category.color : '#ccc'
      } as ExpenseCategorySummary
    })

    return expenseSummaries
  }

}