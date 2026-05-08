import { z } from "zod"
import { PaymentMethod, TransactionOwner, TransactionType } from "@prisma/client"

export const createTransactionValidation = z.object({
    type: z.enum(TransactionType),
    amount: z.number().positive(),
    category: z.string().min(1),
    paymentMethod: z.enum(PaymentMethod).optional(),
    owner: z.enum(TransactionOwner).optional(),
    description: z.string().optional(),
    date: z.string(),
}).refine((data) => {
    if (data.type === TransactionType.expense && !data.paymentMethod) {
        return false
    }
    return true
}, {
    message: "Meio de pagamento é obrigatório para despesas",
    path: ["paymentMethod"],
})

export const updateTransactionValidation = z.object({
    amount: z.number().positive().optional(),
    category: z.string().min(1).optional(),
    paymentMethod: z.enum(PaymentMethod).optional(),
    description: z.string().optional(),
    date: z.string().optional(),
})

export const presetValidation = z.object({
    month: z.number().min(1).max(12),
    year: z.number().min(2000).max(2100),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionValidation>