import { Router } from 'express'
import { readDb, writeDb } from '../db.js'
import { authRequired } from '../middleware/auth.js'

const router = Router()
router.use(authRequired)

const DELIVERY_FEE = { courier: 300, pickup: 0 }
const PAYMENT_METHODS = ['card', 'cash']

router.post('/', (req, res) => {
  const { items, customer, delivery, payment } = req.body ?? {}

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Корзина пуста' })
  }
  if (!customer?.name || !customer?.phone) {
    return res.status(400).json({ message: 'Укажите имя и телефон' })
  }
  if (delivery === 'courier' && !customer?.address) {
    return res.status(400).json({ message: 'Укажите адрес доставки' })
  }
  if (!(delivery in DELIVERY_FEE)) {
    return res.status(400).json({ message: 'Выберите способ доставки' })
  }
  if (!PAYMENT_METHODS.includes(payment)) {
    return res.status(400).json({ message: 'Выберите способ оплаты' })
  }

  const db = readDb()
  const orderItems = []

  for (const raw of items) {
    const product = db.products.find((p) => p.id === raw.productId)
    if (!product) {
      return res.status(400).json({ message: 'Товар не найден' })
    }

    const qty = Number(raw.qty)
    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({ message: 'Некорректное количество товара' })
    }
    if (qty > product.stock) {
      return res
        .status(400)
        .json({ message: `Недостаточно товара «${product.name}» на складе` })
    }

    orderItems.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty,
      image: product.image,
    })
  }

  const itemsTotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryFee = DELIVERY_FEE[delivery]

  const order = {
    id: crypto.randomUUID(),
    userId: req.userId,
    items: orderItems,
    itemsTotal,
    deliveryFee,
    total: itemsTotal + deliveryFee,
    customer: {
      name: String(customer.name).trim(),
      phone: String(customer.phone).trim(),
      address: String(customer.address ?? '').trim(),
      comment: String(customer.comment ?? '').trim(),
    },
    delivery,
    payment,
    status: 'new',
    createdAt: new Date().toISOString(),
  }

  db.orders.push(order)
  writeDb(db)

  res.status(201).json(order)
})

router.get('/', (req, res) => {
  const orders = readDb()
    .orders.filter((o) => o.userId === req.userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  res.json(orders)
})

router.get('/:id', (req, res) => {
  const order = readDb().orders.find((o) => o.id === req.params.id)

  if (!order) {
    return res.status(404).json({ message: 'Заказ не найден' })
  }
  if (order.userId !== req.userId) {
    return res.status(403).json({ message: 'Нет доступа к этому заказу' })
  }

  res.json(order)
})

export default router
