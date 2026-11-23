import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '../../app/hooks'

interface ProtectedRouteProps {
  children: ReactElement
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAppSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}
