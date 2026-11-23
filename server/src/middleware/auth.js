import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Требуется авторизация' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.userId = payload.sub
    next()
  } catch {
    return res.status(401).json({ message: 'Сессия истекла, войдите снова' })
  }
}
