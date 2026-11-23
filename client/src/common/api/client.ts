import axios from 'axios'
import { loadSession } from '../utils/session'

export const api = axios.create({
  baseURL: "/api",
})

let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler
}

api.interceptors.request.use((config) => {
  const session = loadSession()
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.startsWith('/auth/')
    if (error.response?.status === 401 && !isAuthRequest) {
      unauthorizedHandler?.()
    }
    return Promise.reject(error)
  },
)
