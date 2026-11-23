import bcrypt from 'bcryptjs'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config.js'
import { readDb, writeDb } from '../db.js'

const router = Router()
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email })
const signToken = (user) => jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

router.post('/register', (req, res) => {
  const { name, email, password } = req.body ?? {}

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' })
  }
  if (!EMAIL_RE.test(String(email))) {
    return res.status(400).json({ message: 'Некорректный email' })
  }
  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Пароль должен быть не короче 6 символов' })
  }

  const db = readDb()
  const normalizedEmail = String(email).toLowerCase().trim()

  if (db.users.some((u) => u.email === normalizedEmail)) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
  }

  const user = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash: bcrypt.hashSync(String(password), 10),
    createdAt: new Date().toISOString(),
  }

  db.users.push(user)
  writeDb(db)

  res.status(201).json({ token: signToken(user), user: publicUser(user) })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' })
  }

  const db = readDb()
  const user = db.users.find((u) => u.email === String(email).toLowerCase().trim())

  if (!user || !bcrypt.compareSync(String(password), user.passwordHash)) {
    return res.status(401).json({ message: 'Неверный email или пароль' })
  }

  res.json({ token: signToken(user), user: publicUser(user) })
})

export default router
