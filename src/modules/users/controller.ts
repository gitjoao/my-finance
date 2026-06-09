import { Request, Response } from 'express'
import { UserService } from "./service";
import { CreateUser } from "./validation";

const userService = new UserService()
export class UserController {

  async create(req: Request, res: Response) {
    const data = req.body as CreateUser

    let user
    try {
      user = await userService.create(data)
      user.password = undefined as unknown as string
    } catch (error) {
      return res.status(409).json({ message: "Usuário já existe" })
    }

    return res.status(201).json(user)
  }

}