import type { User } from '../types'

const STORAGE_KEY = 'fuel.auth'

export interface UserSession {
  token: string
  user: User
}

export function loadSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UserSession) : null
  } catch {
    return null
  }
}

export function saveSession(session: UserSession) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}
