import { z } from "zod"
import { PaymentMethod, TransactionType } from "../../../generated/prisma/enums"

export const createTransactionValidation = z.object({
    type: z.enum(TransactionType),
    amount: z.number().positive(),
    category: z.string().min(1),
    paymentMethod: z.enum(PaymentMethod).optional(),
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

export type CreateTransactionDTO = z.infer<typeof createTransactionValidation>