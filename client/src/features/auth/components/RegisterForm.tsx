import { Alert, Button, Stack, TextField } from '@mui/material'
import type { SyntheticEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { register } from '../authSlice'

export default function RegisterForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { status, error } = useAppSelector((state) => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    const result = await dispatch(register({ name, email, password }))
    if (register.fulfilled.match(result)) {
      navigate('/', { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
        />

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
          helperText="Минимум 6 символов"
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Регистрация…' : 'Зарегистрироваться'}
        </Button>
      </Stack>
    </form>
  )
}
