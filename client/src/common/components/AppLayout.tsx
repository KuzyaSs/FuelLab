import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router'
import Header from './Header'

export default function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Outlet />
      </Container>
    </Box>
  )
}
