import cors from 'cors'
import express from 'express'
import { PORT } from './config.js'
import { readDb } from './db.js'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'
import productRoutes from './routes/products.js'

readDb()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.use((_req, res) => res.status(404).json({ message: 'Не найдено' }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

app.listen(PORT, () => {
  console.log(`Fuel Lab API: http://localhost:${PORT}`)
})
