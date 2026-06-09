import z from 'zod'

export const getCategoryBudgetsValidate = {
  query: z.object({
    month: z.coerce.number({ error: 'O mês é obrigatório' }).min(1).max(12),
    year: z.coerce.number({ error: 'O ano é obrigatório' }).min(2000).max(2100),
  }),
}

export type GetCategoryBudgetsDTO = z.infer<
  typeof getCategoryBudgetsValidate.query
>
