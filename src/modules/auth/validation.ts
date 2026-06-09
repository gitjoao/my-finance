import { z } from 'zod'
export const loginValidation = {
  body: z.object({
    username: z.string({ error: 'A cor é obrigatória' }),
    password: z.string({ error: 'A senha é obrigatória' }),
  }),
}

export type LoginDTO = z.infer<typeof loginValidation.body>
