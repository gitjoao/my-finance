import { UserRepository } from "./repository";

export class UserService {
  private userRepository = new UserRepository()

  async create(data: { name: string, username: string, password: string }) {

    const userExists = await this.userRepository.findByUsername(data.username)

    if (userExists) {
      throw new Error("User already exists")
    }

    return this.userRepository.create(data)
  }
}