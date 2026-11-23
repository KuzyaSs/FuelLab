export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type Category =
  | 'Протеин'
  | 'Креатин'
  | 'Предтренировочные'
  | 'Витамины'
  | 'Батончики'
  | 'Аминокислоты'

export interface Product {
  id: string
  name: string
  brand: string
  category: Category
  price: number
  oldPrice?: number
  rating: number
  weight: string
  flavors: string[]
  description: string
  image: string
  stock: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface CartItem {
  productId: string
  name: string
  brand: string
  price: number
  image: string
  qty: number
}

export type DeliveryMethod = 'courier' | 'pickup'
export type PaymentMethod = 'card' | 'cash'
export type OrderStatus = 'new'

export interface CustomerInfo {
  name: string
  phone: string
  address: string
  comment: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  qty: number
  image: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  itemsTotal: number
  deliveryFee: number
  total: number
  customer: CustomerInfo
  delivery: DeliveryMethod
  payment: PaymentMethod
  status: OrderStatus
  createdAt: string
}

export interface CreateOrderPayload {
  items: { productId: string; qty: number }[]
  customer: CustomerInfo
  delivery: DeliveryMethod
  payment: PaymentMethod
}
