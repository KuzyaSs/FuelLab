import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Navigate, useNavigate } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  const token = useAppSelector((state) => state.auth.token)
  const navigate = useNavigate()

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }} gutterBottom>
            Регистрация
          </Typography>

          <RegisterForm />

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button size="small" onClick={() => navigate('/login')}>
              Уже есть аккаунт? Войти
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
