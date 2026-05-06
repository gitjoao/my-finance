import { TransactionType } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

export interface TransactionData {
	type: TransactionType
	amount: number
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
				where: { type: "expense", date: { gte: start, lt: end } },
			}),
		])
	}
}