import { z } from 'zod'

export const createTransactionValidation = z
  .object({
    type: z.enum(['income', 'expense']),
    amount: z.number().positive(),
    categoryId: z.string().min(1),
    paymentMethod: z.enum(['credit', 'debit']).optional(),
    installmentTotal: z.number().positive().optional(),
    owner: z.enum(['me', 'father_in_law']).optional(),
    description: z.string().optional(),
    date: z.string(),
  })
  .refine(
    (data) => {
      if (data.type === 'expense' && !data.paymentMethod) {
        return false
      }
      return true
    },
    {
      message: 'Meio de pagamento é obrigatório para despesas',
      path: ['paymentMethod'],
    },
  )

export const updateTransactionValidation = z.object({
  amount: z.number().positive().optional(),
  categoryId: z.string().min(1).optional(),
  paymentMethod: z.enum(['credit', 'debit']).optional(),
  description: z.string().optional(),
  date: z.string().optional(),
})

export const presetValidation = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionValidation>
