import { Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthRequest } from '../types/AuthRequest'

type TokenPayload = JwtPayload & {
  sub: string
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload

    req.user = {
      sub: payload.sub,
    }

    next()
  } catch {
    return res.status(401).json({
      message: 'Token inválido',
    })
  }
}
