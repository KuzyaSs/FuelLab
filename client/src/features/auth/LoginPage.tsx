import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  const token = useAppSelector((state) => state.auth.token)
  const location = useLocation()
  const navigate = useNavigate()

  const from = (location.state as { from?: { pathname?: string } } | null)?.from
    ?.pathname ?? '/'

  if (token) {
    return <Navigate to={from} replace />
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
            Вход
          </Typography>

          <LoginForm />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button size="small" onClick={() => navigate('/register')}>
              Нет аккаунта? Зарегистрируйтесь
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
