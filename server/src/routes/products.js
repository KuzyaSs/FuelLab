import { Router } from 'express'
import { readDb } from '../db.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(readDb().products)
})

router.get('/:id', (req, res) => {
  const product = readDb().products.find((p) => p.id === req.params.id)
  if (!product) {
    return res.status(404).json({ message: 'Товар не найден' })
  }
  res.json(product)
})

export default router
