import { z } from "zod"

export const createTransactionSchema = z.object({
    type: z.enum(["income", "expense"]),
    amount: z.number().positive(),
    category: z.string().min(1),
    description: z.string().optional(),
    date: z.string(),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>