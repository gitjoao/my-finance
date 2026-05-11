import { CategoryRepository } from "../categories/repository"
import { TransactionRepository } from "../transactions/repository"

interface BudgetSummary {
  category: string,
  limit: number,
  used: number,
  available: number
}


export class BudgetService {
  private categoryRepository = new CategoryRepository()
  private transactionRepository = new TransactionRepository()

  async getCategoryBudgets(month: number, year: number) {
    const categoriesWithLimit = await this.categoryRepository.findAllWithLimit()
    const transactions = await this.transactionRepository.findAll({ month, year, type: 'expense', paymentMethod: 'credit' })

    const budgets: BudgetSummary[] = categoriesWithLimit.map(category => {
      const used = transactions
        .filter(transaction => transaction.categoryId === category.id)
        .reduce((sum, transaction) => sum + transaction.amount, 0)

      return {
        category: category.name,
        limit: category.limit!,
        used,
        available: category.limit! - used
      }
    })

    return budgets
  }

}