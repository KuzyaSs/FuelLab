import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product, RequestStatus } from '../../common/types'
import { getErrorMessage } from '../../common/utils/errors'
import { fetchProductRequest, fetchProductsRequest } from './api'

interface ProductsState {
  items: Product[]
  selected: Product | null
  status: RequestStatus
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  selected: null,
  status: 'idle',
  error: null,
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchAll', async (_arg, { rejectWithValue }) => {
  try {
    return await fetchProductsRequest()
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось загрузить каталог'),
    )
  }
})

export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await fetchProductRequest(id)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Не удалось загрузить товар'))
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка загрузки каталога'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.selected = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selected = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка загрузки товара'
      })
  },
})

export default productsSlice.reducer
