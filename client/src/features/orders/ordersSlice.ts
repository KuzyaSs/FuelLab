import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { CreateOrderPayload, Order, RequestStatus, } from '../../common/types'
import { getErrorMessage } from '../../common/utils/errors'
import { createOrderRequest, fetchOrderRequest, fetchOrdersRequest, } from './api'

interface OrdersState {
  items: Order[]
  selected: Order | null
  status: RequestStatus
  error: string | null
}

const initialState: OrdersState = {
  items: [],
  selected: null,
  status: 'idle',
  error: null,
}

export const createOrder = createAsyncThunk<
  Order,
  CreateOrderPayload,
  { rejectValue: string }
>('orders/create', async (payload, { rejectWithValue }) => {
  try {
    return await createOrderRequest(payload)
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось оформить заказ'),
    )
  }
})

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>('orders/fetchAll', async (_arg, { rejectWithValue }) => {
  try {
    return await fetchOrdersRequest()
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось загрузить заказы'),
    )
  }
})

export const fetchOrderById = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>('orders/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await fetchOrderRequest(id)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Не удалось загрузить заказ'))
  }
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selected = action.payload
        state.items = [action.payload, ...state.items]
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка оформления заказа'
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка загрузки заказов'
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.selected = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selected = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка загрузки заказа'
      })
  },
})

export default ordersSlice.reducer
