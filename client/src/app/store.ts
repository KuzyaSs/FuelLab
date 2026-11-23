import { configureStore } from '@reduxjs/toolkit'
import { authPersistenceMiddleware } from '../features/auth/authPersistenceMiddleware'
import authReducer from '../features/auth/authSlice'
import { cartPersistenceMiddleware } from '../features/cart/cartPersistenceMiddleware'
import cartReducer from '../features/cart/cartSlice'
import { loadCart } from '../features/cart/cartStorage'
import ordersReducer from '../features/orders/ordersSlice'
import productsReducer from '../features/products/productsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  preloadedState: {
    cart: { items: loadCart() },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      authPersistenceMiddleware.middleware,
      cartPersistenceMiddleware.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
