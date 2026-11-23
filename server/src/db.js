import bcrypt from 'bcryptjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { products } from './seed/products.js'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(currentDir, '..', 'data')
const DB_PATH = path.join(DATA_DIR, 'db.json')

function createSeed() {
  return {
    users: [
      {
        id: crypto.randomUUID(),
        name: 'Демо Пользователь',
        email: 'demo@fuel.ru',
        passwordHash: bcrypt.hashSync('demo123', 10),
        createdAt: new Date().toISOString(),
      },
    ],
    products,
    orders: [],
  }
}

export function writeDb(data) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    writeDb(createSeed())
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'))
}
