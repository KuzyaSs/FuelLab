import { Box, Button, Card, CardContent, Divider, Stack, Typography, } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import ErrorAlert from '../../common/components/ErrorAlert'
import Loader from '../../common/components/Loader'
import { DELIVERY_LABELS, PAYMENT_LABELS } from '../../common/constants'
import { formatDate, formatPrice } from '../../common/utils/format'
import OrderItemsList from './components/OrderItemsList'
import OrderStatusChip from './components/OrderStatusChip'
import { fetchOrderById } from './ordersSlice'

export default function OrderPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selected, status, error } = useAppSelector((state) => state.orders)

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id))
    }
  }, [id, dispatch])

  if (status === 'idle' || status === 'loading') {
    return <Loader />
  }

  if (status === 'failed') {
    return (
      <Stack spacing={2}>
        <ErrorAlert message={error ?? 'Не удалось загрузить заказ'} />

        <Button
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => navigate('/orders')}
        >
          К заказам
        </Button>
      </Stack>
    )
  }

  if (!selected) {
    return <ErrorAlert message="Заказ не найден" />
  }

  const order = selected

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: 'space-between',
          alignItems: { sm: 'center' },
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Заказ № {order.id.slice(0, 8)}
            </Typography>

            <OrderStatusChip status={order.status} />
          </Stack>

          <Typography color="text.secondary">
            {formatDate(order.createdAt)}
          </Typography>
        </Box>

        <Button onClick={() => navigate('/orders')}>Все заказы</Button>
      </Stack>

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
            <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
              Состав заказа
            </Typography>

            <OrderItemsList items={order.items} />
          </CardContent>
        </Card>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700 }}
                gutterBottom
              >
                Доставка и оплата
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  Доставка: {DELIVERY_LABELS[order.delivery]}
                </Typography>

                <Typography variant="body2">
                  Оплата: {PAYMENT_LABELS[order.payment]}
                </Typography>

                <Typography variant="body2">
                  Получатель: {order.customer.name}
                </Typography>

                <Typography variant="body2">
                  Телефон: {order.customer.phone}
                </Typography>

                {order.customer.address && (
                  <Typography variant="body2">
                    Адрес: {order.customer.address}
                  </Typography>
                )}

                {order.customer.comment && (
                  <Typography variant="body2">
                    Комментарий: {order.customer.comment}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Товары</Typography>

                  <Typography variant="body2">
                    {formatPrice(order.itemsTotal)}
                  </Typography>
                </Stack>

                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Доставка</Typography>

                  <Typography variant="body2">
                    {order.deliveryFee === 0
                      ? 'Бесплатно'
                      : formatPrice(order.deliveryFee)}
                  </Typography>
                </Stack>

                <Divider />

                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="h6">Итого</Typography>

                  <Typography variant="h6">
                    {formatPrice(order.total)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </>
  )
}
