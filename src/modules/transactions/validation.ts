import { z } from 'zod'
import { PaymentMethod, TransactionType } from '@prisma/client'

export const createTransactionValidation = {
  body: z.object({
    type: z.enum(TransactionType),
    amount: z.number().positive(),
    categoryId: z.uuid().min(1),
    paymentMethod: z.enum(PaymentMethod).optional(),
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
}
export const updateTransactionValidation = {
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    amount: z.number().positive().optional(),
    categoryId: z.uuid().min(1).optional(),
    paymentMethod: z.enum(PaymentMethod).optional(),
    description: z.string().optional(),
    date: z.string().optional(),
  })
}

export const presetValidation = {
  body: z.object({
    month: z.number().min(1).max(12),
    year: z.number().min(2000).max(2100),
  })
}

export const listTransactionsValidation = {
  query: z.object({
    type: z.enum(TransactionType).optional(),
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().min(2000).max(2100).optional(),
    paymentMethod: z.enum(PaymentMethod).optional(),
    categoryId: z.uuid().min(1).optional(),
  })
}

export type CreateTransactionDTO = z.infer<typeof createTransactionValidation>
export type UpdateTransactionDTO = z.infer<typeof updateTransactionValidation>
export type PresetDTO = z.infer<typeof presetValidation>