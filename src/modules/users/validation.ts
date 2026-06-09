import { z } from 'zod'
export const createUserValidation = {
  body: z.object({
    name: z.string({ error: "O nome é obrigatório" }),
    username: z.string({ error: "A cor é obrigatória" }),
    password: z.string({ error: "A senha é obrigatória" })
  }),
}

export type CreateUser = z.infer<typeof createUserValidation.body>