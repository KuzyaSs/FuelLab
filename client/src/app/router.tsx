import { createBrowserRouter } from 'react-router'
import AppLayout from '../common/components/AppLayout'
import NotFoundPage from '../common/components/NotFoundPage'
import ProtectedRoute from '../common/components/ProtectedRoute'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import CartPage from '../features/cart/CartPage'
import CheckoutPage from '../features/orders/CheckoutPage'
import OrderPage from '../features/orders/OrderPage'
import OrdersPage from '../features/orders/OrdersPage'
import CatalogPage from '../features/products/CatalogPage'
import ProductPage from '../features/products/ProductPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders/:id',
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
])
