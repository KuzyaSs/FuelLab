import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import type { Order } from '../../../common/types'
import { formatDate, formatPrice } from '../../../common/utils/format'
import OrderStatusChip from './OrderStatusChip'

interface OrderCardProps {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate()
  const itemsCount = order.items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <Card>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
        >
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700 }}>
                Заказ № {order.id.slice(0, 8)}
              </Typography>

              <OrderStatusChip status={order.status} />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              {formatDate(order.createdAt)} · {itemsCount} шт.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {formatPrice(order.total)}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              Подробнее
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
