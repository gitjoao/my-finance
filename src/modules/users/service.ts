import { UserRepository } from "./repository";
import bcrypt from "bcryptjs";

export class UserService {
  private userRepository = new UserRepository()

  async create(data: { name: string, username: string, password: string }) {

    const userExists = await this.userRepository.findByUsername(data.username)

    if (userExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    return this.userRepository.create({ ...data, password: passwordHash })
  }
}