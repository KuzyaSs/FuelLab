import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { addItem, clear, removeItem, setQty } from './cartSlice'
import { saveCart } from './cartStorage'

export const cartPersistenceMiddleware = createListenerMiddleware()

cartPersistenceMiddleware.startListening({
  matcher: isAnyOf(addItem, removeItem, setQty, clear),
  effect: (_action, api) => {
    saveCart((api.getState() as RootState).cart.items)
  },
})
