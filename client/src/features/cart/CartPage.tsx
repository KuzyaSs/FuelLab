import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../app/hooks'
import EmptyState from '../../common/components/EmptyState'
import CartItemRow from './components/CartItemRow'
import CartSummary from './components/CartSummary'

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items)
  const navigate = useNavigate()

  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  )

  if (items.length === 0) {
    return (
      <EmptyState
        title="Корзина пуста"
        description="Добавьте товары из каталога, чтобы оформить заказ."
        action={
          <Button variant="contained" onClick={() => navigate('/')}>
            В каталог
          </Button>
        }
      />
    )
  }

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 800 }} gutterBottom>
        Корзина
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          alignItems: 'start',
        }}
      >
        <Card>
          <CardContent>
            {items.map((item, index) => (
              <Box key={item.productId}>
                {index > 0 && <Divider />}
                <CartItemRow item={item} />
              </Box>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <CartSummary itemsTotal={itemsTotal} />
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
