import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { CartItem } from '../../common/types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId,
      )
      if (existing) {
        existing.qty += action.payload.qty
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      )
    },
    setQty(
      state,
      action: PayloadAction<{ productId: string; qty: number }>,
    ) {
      const item = state.items.find(
        (entry) => entry.productId === action.payload.productId,
      )
      if (item) {
        item.qty = Math.max(1, action.payload.qty)
      }
    },
    clear(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, setQty, clear } = cartSlice.actions
export default cartSlice.reducer
