import type {
  Category,
  DeliveryMethod,
  OrderStatus,
  PaymentMethod,
} from './types'

export const CATEGORIES: Category[] = [
  'Протеин',
  'Креатин',
  'Предтренировочные',
  'Витамины',
  'Батончики',
  'Аминокислоты',
]

export const DELIVERY_OPTIONS: {
  value: DeliveryMethod
  label: string
  fee: number
}[] = [
    { value: 'courier', label: 'Курьером (300 ₽)', fee: 300 },
    { value: 'pickup', label: 'Самовывоз (бесплатно)', fee: 0 },
  ]

export const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: 'card', label: 'Картой онлайн' },
  { value: 'cash', label: 'При получении' },
]

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новый',
}

export const DELIVERY_LABELS: Record<DeliveryMethod, string> = {
  courier: 'Курьером',
  pickup: 'Самовывоз',
}

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  card: 'Картой онлайн',
  cash: 'При получении',
}
