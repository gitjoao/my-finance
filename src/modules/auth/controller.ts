import { Request, Response } from 'express'
import { AuthService } from "./service";
import { LoginDTO } from './validation';

const authService = new AuthService()
export class AuthController {

  async login(req: Request, res: Response) {
    const data = req.body as unknown as LoginDTO

    let token

    try {
      token = await authService.login(data)
    } catch (error) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" })
    }

    return res.status(200).json(token)
  }

}