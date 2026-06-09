import bcrypt from 'bcryptjs'
import { UserRepository } from '../users/repository'
import { LoginDTO } from './validation'
import jwt from 'jsonwebtoken'

export class AuthService {
  private userRepository = new UserRepository()

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByUsername(data.username)

    if (!user) {
      throw new Error('Invalid Credentials')
    }

    const validPassword = await bcrypt.compare(data.password, user.password)

    if (!validPassword) {
      throw new Error('Invalid Credentials')
    }

    const token = jwt.sign(
      {
        sub: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      },
    )

    return {
      token,
    }
  }
}
