import { z } from 'zod'
import { TransactionType } from '@prisma/client'

export const listCategoriesValidation = z.object({
	query: z.object({
		type: z.enum(TransactionType).optional(),
	}),
})
