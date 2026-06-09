import { prisma } from '../../lib/prisma'

export class UserRepository {
  create(data: any) {
    return prisma.user.create({ data })
  }

  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } })
  }
}
