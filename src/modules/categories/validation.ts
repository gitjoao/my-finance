import { z } from 'zod'
import { TransactionType } from '@prisma/client'

export const listCategoriesValidation = {
  query: z.object({
    type: z.enum(TransactionType).optional(),
  }),
}

export type ListCategories = z.infer<typeof listCategoriesValidation.query>

export const createCategoryValidation = {
  body: z.object({
    name: z.string({ error: 'O nome é obrigatório' }),
    color: z.string({ error: 'A cor é obrigatória' }),
    type: z.enum(TransactionType, { error: 'O tipo é obrigatório' }),
    limit: z
      .number({ error: 'O limite é precisa ser um número' })
      .positive({ message: 'O limite deve ser um número positivo' })
      .optional(),
  }),
}

export type CreateCategory = z.infer<typeof createCategoryValidation.body>

export const updateCategoryValidation = {
  params: z.object({
    id: z.string({ error: 'O ID é obrigatório' }),
  }),
  body: z.object({
    name: z.string().optional(),
    color: z.string().optional(),
    type: z.enum(TransactionType).optional(),
    limit: z.number().optional(),
  }),
}

export type UpdateCategory = z.infer<typeof updateCategoryValidation.body>
export type UpdateCategoryParams = z.infer<
  typeof updateCategoryValidation.params
>
