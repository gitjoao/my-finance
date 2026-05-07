import {
	PaymentMethod,
	TransactionOwner,
	TransactionType,
} from "@prisma/client";
import { prisma } from "../../lib/prisma";

export interface TransactionData {
	type: TransactionType;
	amount: number;
	owner?: TransactionOwner;
	paymentMethod?: PaymentMethod;
	category: string;
	description?: string;
	date: Date;
}

type Filters = {
	type?: "income" | "expense";
	month?: number;
	year?: number;
};

export class TransactionRepository {
	create(data: TransactionData) {
		return prisma.transaction.create({ data });
	}

	findAll(filters: Filters) {
		const where: any = {};

		if (filters.type) {
			where.type = filters.type;
		}

		if (filters.month && filters.year) {
			const start = new Date(Date.UTC(filters.year, filters.month - 1, 1));

			const end = new Date(Date.UTC(filters.year, filters.month, 1));

			where.date = {
				gte: start,
				lt: end,
			};
		}

		return prisma.transaction.findMany({
			where,
			orderBy: {
				date: "asc",
			},
		});
	}

	getSummaryByMonth(start: Date, end: Date) {
		const periodFilter = {
			date: {
				gte: start,
				lt: end,
			},
		};
		return Promise.all([
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "income", ...periodFilter },
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: { type: "expense", owner: "me", ...periodFilter },
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: {
					type: "expense",
					owner: "me",
					paymentMethod: "credit",
					...periodFilter,
				},
			}),
			prisma.transaction.aggregate({
				_sum: { amount: true },
				where: {
					type: "expense",
					owner: "father_in_law",
					paymentMethod: "credit",
					...periodFilter,
				},
			}),
			prisma.transaction.findMany({
				where: { type: "expense", ...periodFilter },
				orderBy: { date: "asc" },
			}),
		]);
	}

	findById(id: string) {
		return prisma.transaction.findUnique({ where: { id } });
	}

	update(id: string, data: Partial<TransactionData>) {
		return prisma.transaction.update({ where: { id }, data });
	}

	delete(id: string) {
		return prisma.transaction.delete({ where: { id } });
	}
}
