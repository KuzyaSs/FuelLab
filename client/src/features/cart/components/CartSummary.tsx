import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { formatPrice } from '../../../common/utils/format'

interface CartSummaryProps {
  itemsTotal: number
  disabled?: boolean
}

export default function CartSummary({
  itemsTotal,
  disabled,
}: CartSummaryProps) {
  const navigate = useNavigate()

  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography>Товары</Typography>
          <Typography>{formatPrice(itemsTotal)}</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Доставка рассчитывается на следующем шаге
        </Typography>

        <Divider />

        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Итого</Typography>

          <Typography variant="h6">{formatPrice(itemsTotal)}</Typography>
        </Stack>

        <Button
          variant="contained"
          size="large"
          disabled={disabled}
          onClick={() => navigate('/checkout')}
        >
          Оформить заказ
        </Button>
      </Stack>
    </Box>
  )
}
