import { Request, Response } from 'express'
import { AuthService } from './service'
import { LoginDTO } from './validation'

const authService = new AuthService()
export class AuthController {
  async login(req: Request, res: Response) {
    const data = req.body as unknown as LoginDTO

    let auth

    try {
      auth = await authService.login(data)
      res.cookie("token", auth.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });
    } catch (error) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' })
    }

    return res.json({
      user: {
        id: auth.user.id,
        name: auth.user.name,
        username: auth.user.username,
      },
    });
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(204).send();
  }
}
