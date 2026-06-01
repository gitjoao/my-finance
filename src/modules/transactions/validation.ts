import { z } from 'zod'
import { PaymentMethod, TransactionType, TransactionOwner } from '@prisma/client'

export const createTransactionValidation = {
  body: z.object({
    type: z.enum(TransactionType),
    amount: z.number({ error: "O valor é obrigatório" }).positive(),
    categoryId: z.uuid({ error: "Selecione uma categoria" }),
    paymentMethod: z.enum(PaymentMethod, { error: "O meio de pagamento é obrigatório" }).optional(),
    installmentTotal: z.number({ error: "O total de parcelas é obrigatório" }).positive().optional(),
    owner: z.enum(TransactionOwner, { error: "O proprietário é obrigatório" }),
    description: z.string().optional(),
    date: z.string({ error: "A data é obrigatória" }),
  })
}
export const updateTransactionValidation = {
  params: z.object({
    id: z.uuid(),
  }),
  body: z.object({
    amount: z.number({ error: "O valor é obrigatório" }).positive().optional(),
    categoryId: z.uuid({ error: "Selecione uma categoria" }).min(1).optional(),
    paymentMethod: z.enum(PaymentMethod, { error: "O meio de pagamento é obrigatório" }).optional(),
    description: z.string().optional(),
    paid: z.boolean().optional(),
    date: z.string({ error: "A data é obrigatória" }).optional(),
  })
}

export const presetValidation = {
  body: z.object({
    month: z.number({ error: "O mês é obrigatório" }).min(1).max(12),
    year: z.number({ error: "O ano é obrigatório" }).min(2000).max(2100),
  })
}

export const listTransactionsValidation = {
  query: z.object({
    type: z.enum(TransactionType).optional(),
    month: z.coerce.number().min(1).max(12).optional(),
    year: z.coerce.number().min(2000).max(2100).optional(),
    paymentMethod: z.enum(PaymentMethod).optional(),
    categoryId: z.uuid().min(1).optional(),
    paid: z.boolean().optional(),
  })
}

export type CreateTransactionDTO = z.infer<typeof createTransactionValidation>
export type UpdateTransactionDTO = z.infer<typeof updateTransactionValidation.body>
export type PresetDTO = z.infer<typeof presetValidation>