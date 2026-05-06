import { TransactionData, TransactionRepository } from "./transaction.repository"

export class TransactionService {
  private repo = new TransactionRepository()

  async create(data: TransactionData) {
    return this.repo.create(data)
  }

  async getSummaryByMonth(month: number, year: number) {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 1)

    const [income, expense, meCredit, fatherInLawCredit, transactions] = await this.repo.getSummaryByMonth(start, end)

    const totalIncome = income._sum.amount ?? 0
    const totalExpense = expense._sum.amount ?? 0
    const totalMeCredit = meCredit._sum.amount ?? 0
    const totalFatherInLawCredit = fatherInLawCredit._sum.amount ?? 0

    return {
      summary: {
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
        credit: totalMeCredit + totalFatherInLawCredit,
      },
      debts: {
        fatherInLaw: totalFatherInLawCredit,
      },
      transactions
    }
  }

  async findAll() {
    return this.repo.findAll()
  }
}