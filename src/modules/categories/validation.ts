import { z } from 'zod'
import { TransactionType } from '@prisma/client'

export const listCategoriesValidation = {
	query: z.object({
		type: z.enum(TransactionType).optional(),
	}),
}
