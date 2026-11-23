import { api } from '../../common/api/client'
import type { CreateOrderPayload, Order } from '../../common/types'

export async function createOrderRequest(
  payload: CreateOrderPayload,
): Promise<Order> {
  const { data } = await api.post<Order>('/orders', payload)
  return data
}

export async function fetchOrdersRequest(): Promise<Order[]> {
  const { data } = await api.get<Order[]>('/orders')
  return data
}

export async function fetchOrderRequest(id: string): Promise<Order> {
  const { data } = await api.get<Order>(`/orders/${id}`)
  return data
}
