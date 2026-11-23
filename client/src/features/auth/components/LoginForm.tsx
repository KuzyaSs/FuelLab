import { Alert, Button, Stack, TextField } from '@mui/material'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login } from '../authSlice'

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const from = (location.state as { from?: { pathname?: string } } | null)?.from
    ?.pathname ?? '/'

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const result = await dispatch(login({ email, password }))
    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Вход…' : 'Войти'}
        </Button>
      </Stack>
    </form>
  )
}
