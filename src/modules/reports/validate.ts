import { z } from 'zod'

export const getExpenseCategorySummariesValidation = {
  query: z.object({
    month: z.coerce.number({ error: 'O mês é obrigatório' }).min(1).max(12),
    year: z.coerce.number({ error: 'O ano é obrigatório' }).min(2000).max(2100),
  }),
}

export const getAllTransactionsByPeriodValidation = {
  query: z
    .object({
      startMonth: z.coerce
        .number({ error: 'O mês de início é obrigatório' })
        .min(1)
        .max(12),
      startYear: z.coerce
        .number({ error: 'O ano de início é obrigatório' })
        .min(2000)
        .max(2100),
      endMonth: z.coerce
        .number({ error: 'O mês de término é obrigatório' })
        .min(1)
        .max(12),
      endYear: z.coerce
        .number({ error: 'O ano de término é obrigatório' })
        .min(2000)
        .max(2100),
    })
    .refine(
      ({ startMonth, startYear, endMonth, endYear }) => {
        const monthsDiff = (endYear - startYear) * 12 + (endMonth - startMonth)

        return monthsDiff >= 0 && monthsDiff <= 5
      },
      {
        message: 'O período máximo permitido é de 6 meses',
        path: ['endMonth'],
      },
    ),
}

export type GetExpenseCategorySummariesDTO = z.infer<
  typeof getExpenseCategorySummariesValidation.query
>
export type GetAllTransactionsByPeriodDTO = z.infer<
  typeof getAllTransactionsByPeriodValidation.query
>
