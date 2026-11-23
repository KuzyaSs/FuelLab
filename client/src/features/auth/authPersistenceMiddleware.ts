import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { clearSession, saveSession } from '../../common/utils/session'
import { loggedOut, login, register } from './authSlice'

export const authPersistenceMiddleware = createListenerMiddleware()

authPersistenceMiddleware.startListening({
  matcher: isAnyOf(login.fulfilled, register.fulfilled, loggedOut),
  effect: (_action, api) => {
    const { token, user } = (api.getState() as RootState).auth
    if (token && user) {
      saveSession({ token: token, user: user })
    } else {
      clearSession()
    }
  },
})
