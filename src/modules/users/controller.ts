import { Request, Response } from 'express'
import { UserService } from "./service";
import { CreateUser } from "./validation";

const userService = new UserService()
export class UserController {

  async create(req: Request, res: Response) {
    const data = req.body as CreateUser
    const user = await userService.create(data)

    return res.status(201).json(user)
  }

}