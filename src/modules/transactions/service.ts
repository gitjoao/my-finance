import { randomUUID } from 'node:crypto'
import { fixedExpenses } from './preset/fixedExpenses'
import { TransactionRepository } from './repository'

export class TransactionService {
  private repo = new TransactionRepository()

  async create(data: any) {
    const isInstallment = data.installmentTotal && data.installmentTotal > 1

    if (isInstallment) {
      const installmentGroup = randomUUID()

      const transactions = []

      for (let i = 0; i < data.installmentTotal; i++) {
        const installmentDate = new Date(data.date)

        installmentDate.setMonth(installmentDate.getMonth() + i)

        transactions.push({
          ...data,
          installmentGroup,
          installmentNumber: i + 1,
          installmentTotal: data.installmentTotal,
          date: installmentDate,
        })
      }

      return this.repo.createMany(transactions)
    }

    return this.repo.create(data)
  }

  async getSummaryByMonth(month: number, year: number) {
    const start = new Date(Date.UTC(year, month - 1, 1))

    const end = new Date(Date.UTC(year, month, 1))

    const [income, expense, meCredit, fatherInLawCredit, transactions] =
      await this.repo.getSummaryByMonth(start, end)

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
      transactions,
    }
  }

  async list(filters: {
    type?: 'income' | 'expense'
    month?: number
    year?: number
    paymentMethod?: 'credit' | 'debit'
    categoryId?: string
    paid?: boolean
  }) {
    return this.repo.findAll(filters)
  }

  async delete(id: string) {
    const transaction = await this.repo.findById(id)

    if (!transaction) {
      throw new Error('Transação não encontrada')
    }

    return this.repo.delete(id)
  }

  async update(id: string, data: Partial<any>) {
    const transaction = await this.repo.findById(id)
    if (!transaction) {
      throw new Error('Transação não encontrada')
    }
    return this.repo.update(id, data)
  }

  async findById(id: string) {
    const transaction = await this.repo.findById(id)
    if (!transaction) {
      throw new Error('Transação não encontrada')
    }
    return transaction
  }

  async createPreset(month: number, year: number) {
    const transactions = fixedExpenses.map((expense) => ({
      type: 'expense',
      amount: expense.amount,
      categoryId: expense.category,
      paymentMethod: 'debit',
      owner: 'me',
      description: expense.description,
      date: new Date(Date.UTC(year, month - 1, 1)),
    }))

    return this.repo.createMany(transactions)
  }

  async payCreditCardBill(month: number, year: number) {
    const start = new Date(Date.UTC(year, month - 1, 1))
    const end = new Date(Date.UTC(year, month, 1))

    try {
      await this.repo.updateExpensesCreditCard(start, end)
    } catch (error) {
      throw new Error('Erro ao pagar a fatura do cartão de crédito')
    }
  }
}
