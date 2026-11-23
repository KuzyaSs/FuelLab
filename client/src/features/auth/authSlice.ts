import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthResponse, RequestStatus, User } from '../../common/types'
import { getErrorMessage } from '../../common/utils/errors'
import { loadSession } from '../../common/utils/session'
import type { LoginPayload, RegisterPayload } from './api'
import { loginRequest, registerRequest } from './api'

interface AuthState {
  user: User | null
  token: string | null
  status: RequestStatus
  error: string | null
}

const session = loadSession()

const initialState: AuthState = {
  user: session?.user ?? null,
  token: session?.token ?? null,
  status: 'idle',
  error: null,
}

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await loginRequest(payload)
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, 'Не удалось войти'))
  }
})

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await registerRequest(payload)
  } catch (error) {
    return rejectWithValue(
      getErrorMessage(error, 'Не удалось зарегистрироваться'),
    )
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedOut(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка входа'
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Ошибка регистрации'
      })
  },
})

export const { loggedOut, clearAuthError } = authSlice.actions
export default authSlice.reducer
