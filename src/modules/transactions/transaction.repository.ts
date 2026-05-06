import { PaymentMethod, TransactionOwner, TransactionType } from "@prisma/client"
import { prisma } from "../../lib/prisma"

export interface TransactionData {
	type: TransactionType
	amount: number
	owner?: TransactionOwner
	paymentMethod?: PaymentMethod
	category: string
	description?: string
	date: Date
}

export class TransactionRepository {
	create(data: TransactionData) {
		return prisma.transaction.create({ data })
	}

	findAll() {
		return prisma.transaction.findMany({
			orderBy: { date: "desc" },
		})
	}

	getSummaryByMonth(start: Date, end: Date) {
		return Promise.all([
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "income", date: { gte: start, lt: end } },
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "expense", owner: "me", date: { gte: start, lt: end } },
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "expense", owner: "me", paymentMethod: "credit", date: { gte: start, lt: end } },
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "expense", owner: "father_in_law", paymentMethod: "credit", date: { gte: start, lt: end } },
			}),
			prisma.transaction.findMany({
				where: { date: { gte: start, lt: end } },
				orderBy: { date: "asc" },
			}),
		])
	}

	findById(id: string) {
		return prisma.transaction.findUnique({ where: { id } })
	}

	update(id: string, data: Partial<TransactionData>) {
		return prisma.transaction.update({ where: { id }, data })
	}

	delete(id: string) {
		return prisma.transaction.delete({ where: { id } })
	}
}