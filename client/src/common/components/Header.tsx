import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Badge, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, } from '@mui/material'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loggedOut } from '../../features/auth/authSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0),
  )
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget)
  }
  const handleMenuClose = () => setMenuAnchor(null)

  const handleLogout = () => {
    handleMenuClose()
    dispatch(loggedOut())
    navigate('/')
  }

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, cursor: 'pointer', mr: 2 }}
          onClick={() => navigate('/')}
        >
          Fuel Lab
        </Typography>

        <Button color="inherit" onClick={() => navigate('/')}>
          Каталог
        </Button>

        <Button color="inherit" onClick={() => navigate('/orders')}>
          Заказы
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          color="inherit"
          aria-label="Корзина"
          onClick={() => navigate('/cart')}
        >
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {user ? (
          <>
            <Button color="inherit" onClick={handleMenuOpen}>
              {user.name}
            </Button>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Вход
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Регистрация
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
