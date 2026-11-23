import { api } from '../../common/api/client'
import type { Product } from '../../common/types'

export async function fetchProductsRequest(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export async function fetchProductRequest(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}
